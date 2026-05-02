import axios from "axios";
import api from "src/configs/api";
import { getCookie } from "utils/cookie";

const addPost = async (data) => {
  const formData = new FormData();
  for (let i in data) {
    formData.append(i, data[i]);
  }
  const token = getCookie("accessToken");
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASEURL}post/create`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log("API Error:", error.response?.status, error.response?.data);
    throw error;
  }
};
const getPosts = () => api.get("post/my");
const removePost = (id) => api.delete(`post/delete/${id}`);

export { addPost, getPosts, removePost };
