/**
 * @module productApi
 */
import axios from 'axios';

const BASE_URL = 'https://dkp298o56i.execute-api.ap-south-1.amazonaws.com/dev/';

/**
 * `productApi` is an instance of Axios configured with the base URL and default headers for the product API.
 * It can be used to make HTTP requests to the product API endpoints.
 *
 * @type {AxiosInstance}
 */
export const productApi = axios.create({
  baseURL: BASE_URL,
});

productApi.defaults.headers.common['Content-Type'] = 'application/json';
productApi.defaults.headers.common['X-API-KEY'] = process.env.REACT_APP_API_KEY;

/**
 * Creates a new product.
 *
 * @function createProductFn
 * @param {object} product - The product data to be created
 * @returns {Promise<object>} A promise that resolves to the created product data
 */
export const createProductFn = async (product) => {
  const response = await productApi.post('products/', product);
  return response.data;
};

/**
 * Updates an existing product.
 *
 * @function updateProductFn
 * @param {string} productId - The ID of the product to update
 * @param {object} product - The updated product data
 * @returns {Promise<object>} A promise that resolves to the updated product data
 */
export const updateProductFn = async (productId, product) => {
  const response = await productApi.patch(`products/${productId}`);
  return response.data;
};

/**
 * Deletes a product.
 *
 * @function deleteProductFn
 * @param {string} productId - The ID of the product to delete
 * @returns {Promise<void>} A promise that resolves when the product is deleted successfully
 */
export const deleteProductFn = async (productId) => {
  return productApi.delete(`products/${productId}`);
};

/**
 * Retrieves a specific product by ID.
 *
 * @function getProductFn
 * @param {string} productId - The ID of the product to retrieve
 * @returns {Promise<object>} A promise that resolves to the retrieved product data
 */
export const getProductFn = async (productId) => {
  const response = await productApi.get(`products/${productId}`);
  return response.data;
};

/**
 * Retrieves a list of products.
 *
 * @function getProductsFn
 * @param {number} page - The page number of the products list (optional, default: 1)
 * @param {number} limit - The maximum number of products per page (optional, default: 10)
 * @returns {Promise<object>} A promise that resolves to the list of products data
 */
export const getProductsFn = async (page = 1, limit = 1000) => {
  const response = await productApi.get(`products?page=${page}&limit=${limit}`);
  return response.data;
};

/**
 * Uploads an image file to the server and returns the uploaded image URL.
 *
 * @function uploadImageFn
 * @param {File} imageFile - The image file to upload
 * @returns {Promise<string>} A promise that resolves to the URL of the uploaded image
 */
export const uploadImageFn = async (imageFile) => {
  // Read and convert the image file using FileReader
  // Send the image data to the server using productApi.post()
  const reader = new FileReader();
  reader.readAsDataURL(imageFile);
  return new Promise((resolve, reject) => {
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1];
      // Send image data to your API
      try {
        const response = await productApi.post(`products/upload-image`, {
          image: base64Image,
          mime: imageFile.type,
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
};
