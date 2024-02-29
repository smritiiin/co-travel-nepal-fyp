import axios from "axios";

export const addPlace = async ({
  PlaceName,
  StateId,
  Description,
  Latitude,
  Longitude,
  Image,
}: {
  PlaceName: string;
  StateId: number;
  Description: string;
  Latitude: number;
  Longitude: number;
  Image?: File | null;
}) => {
  try {
    const response = await axios.post("http://localhost:8000/api/place/add", {
      PlaceName,
      StateId,
      Description,
      Latitude,
      Longitude,
      Image,
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
