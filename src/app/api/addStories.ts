import axios from "axios";

export const addStories = async ({
  title,
  content,
  authorId,
}: {
  title: string;
  content: string;
  authorId: number;
}) => {
  try {
    const response = await axios.post("http://localhost:8000/api/blog/add", {
      title,
      content,
      authorId,
    });
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
