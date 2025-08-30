import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export const fetchLogs = async () => {
  const res = await axios.get(`${API}/api/devlogs`);
  return res.data.logs || res.data;
};

export const fetchLog = (id: string) => axios.get(`${API}/api/devlogs/${id}`);

export const createLog = (data: { title: string; content: string }) =>
  axios.post(`${API}/api/devlogs`, data);

export const updateLog = (
  id: string,
  data: { title: string; content: string }
) => axios.put(`${API}/api/devlogs/${id}`, data);

export const deleteLog = (id: string) =>
  axios.delete(`${API}/api/devlogs/${id}`);
