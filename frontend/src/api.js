import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


export const getQuestions = () => api.get("/questions");
export const addQuestion = (question) => api.post("/questions", question);
export const deleteQuestion = (id) => api.delete(`/questions/${id}`);
export const submitScore = (score) => api.post("/scores", score);
export const getRanking = () => api.get("/scores");
