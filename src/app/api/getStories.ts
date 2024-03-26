import axios from "axios";

export const getStories = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/blog");
    const data = response?.data;
    return { success: true, data };
  } catch (error: any) {
    if (
      error.response &&
      error.response?.status >= 400 &&
      error.response?.status <= 500
    ) {
      return {
        success: false,
        error: error.response.data.message || error.response.data,
      };
    }
  }
};
