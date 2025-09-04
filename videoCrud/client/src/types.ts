export interface VideoDoc {
  _id: string;
  title: string;
  description: string;
  filename: string;
  fileId: string;
  contentType: string;
  length: number;
  createdAt: string;
  updatedAt: string;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
}
