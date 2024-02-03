import axios from "axios";

export const login = async ({ email, password }: {email: string; password: string}) => {
  try {
    const response = await axios.post('http://localhost:8000/api/user/login', {
      email,
      password,
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