import axios from "axios"

const BASE_URL = "https://dkp298o56i.execute-api.ap-south-1.amazonaws.com/dev/"

export const productApi = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true
})

productApi.defaults.headers.common["Content-Type"] = "application/json"
productApi.defaults.headers.common["X-API-KEY"] = "r1J23lGqOn2Uw3K1BOG8h1fzKo6OAO5g5hY8P41n"

export const createProductFn = async (product) => {
  const response = await productApi.post("products/", product);
  return response.data;
}

export const updateProductFn = async (productId, product) => {
  const response = await productApi.patch(`products/${productId}`)
  return response.data;
}

export const deleteProductFn = async (productId) => {
  return productApi.delete(`products/${productId}`);
}

export const getProductFn = async (productId) => {
  const response = await productApi.get(`products/${productId}`);
  return response.data;
}

export const getProductsFn = async (page = 1, limit = 10) => {
  const response = await productApi.get(`products?page=${page}&limit=${limit}`);
  return response.data;
}

export const uploadImageFn = async(imageFile) => {
  const reader = new FileReader();
  reader.readAsDataURL(imageFile);
  return new Promise((resolve, reject) => {
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1];
      // Send image data to your API
      try {
        const response = await productApi.post(`products/upload-image`, {
          image: base64Image,
          mime: imageFile.type
        });
        resolve(response.data.imageURL);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (err) => {
      reject(err);
    };
  });
}
