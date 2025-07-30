import { ObjectId } from "mongodb";

export class TextModel {
  constructor(db) {
    this.collection = db.collection("texts");
  }

  async getAll() {
    return await this.collection.find().toArray();
  }

  async create(text) {
    const result = await this.collection.insertOne({ text });
    return result;
  }

  async deleteById(id) {
    return await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}
