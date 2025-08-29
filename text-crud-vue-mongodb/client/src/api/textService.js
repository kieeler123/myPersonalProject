import axios from "axios";

const API_URL = "http://localhost:4000/api/texts"; // 실제 호출은 프록시를 통해 전달됨

export const getTexts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createText = async (text) => {
  const res = await axios.post(API_URL, { text });
  return res.data;
};

export const updateText = async (text) => {
  const res = await axios.put(`${API_URL}/${text.id}`, { text });
  return res.data;
};

export const deleteText = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
