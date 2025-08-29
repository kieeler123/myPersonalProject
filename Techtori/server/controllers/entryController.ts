import { Request, Response } from "express";
import Entry from "../models/Entry";

export const getEntries = async (req: Request, res: Response) => {
  try {
    const {
      q,
      tags,
      from,
      to,
      page = "1",
      limit = "10",
      sort = "desc",
    } = req.query as Record<string, string>;

    const filter: any = {};
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) {
        const end = new Date(to);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }
    if (tags) {
      const tagArr = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      if (tagArr.length) filter.tags = { $all: tagArr };
    }

    let textStage: any = {};
    if (q && q.trim()) textStage = { $text: { $search: q.trim() } };

    const pageNum = Math.max(parseInt(page, 10), 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10), 1), 50);
    const skip = (pageNum - 1) * limitNum;

    const baseQuery = q ? { ...filter, ...textStage } : filter;
    const query = Entry.find(baseQuery);
    if (q && q.trim()) {
      query.or([
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
      ]);
    }

    const sortOpt = sort === "asc" ? 1 : -1;
    query.sort({ createdAt: sortOpt }).skip(skip).limit(limitNum);

    const [items, total] = await Promise.all([
      query.exec(),
      Entry.countDocuments(baseQuery),
    ]);

    res.json({
      data: items,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "검색 중 오류가 발생했습니다." });
  }
};

export const createEntry = async (req: Request, res: Response) => {
  const saved = await new Entry(req.body).save();
  res.status(201).json(saved);
};

export const deleteEntry = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Entry.findByIdAndDelete(id);
  res.status(204).send();
};
