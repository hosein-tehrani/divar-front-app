import api from "src/configs/api";

const addCategory = async (data) => {
  try {
    const response = await api.post("category", data);
    return response;
  } catch (error) {
    throw error;
  }
};
const getCategories = () => api.get("category");
const removeCategory = (id) => api.delete(`category/${id}`);
export { addCategory, getCategories, removeCategory };
