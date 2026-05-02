import api from "src/configs/api";

const addCategory = (data) => api.post("category", data);
const getCategories = () => api.get("category");
const removeCategory = (id) => api.delete(`category/${id}`);
export { addCategory, getCategories, removeCategory };
