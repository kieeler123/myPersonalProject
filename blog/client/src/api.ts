// client/src/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000/api", // 👈 여기까지 들어가야 함
  withCredentials: true,
});