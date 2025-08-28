// axios 인스턴스 (모든 요청은 여기로만!)
import axios from "axios";
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:4000",
});
