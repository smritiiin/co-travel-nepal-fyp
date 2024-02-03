import axios from "axios";

export const signup = async ({
  fname,
  lname,
  email,
  password,
  confirmPassword,
}: {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  // const API_URL = `http://localhost:8000/api/users`
  try {
    const response = await axios.post("http://localhost:8000/api/user", {
      fname,
      lname,
      email,
      password,
      confirmPassword,
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