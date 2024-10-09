import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
  });

export const uploadImage = async ({image}:{image:globalThis.File}):Promise<{url:string}> => {
    try {
        const formData = new FormData();
        formData.append('image', image); // Ensure the field name matches what your server expects
        const response = await apiClient.post('/',formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading the image: ', error);
      throw error;
    }
}