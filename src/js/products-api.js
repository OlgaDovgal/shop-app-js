import axios from 'axios';
import { API_ENDPOINTS, BASE_URL, PER_PAGE } from './constants';
axios.defaults.baseURL = BASE_URL;
export async function getCategoris() {
  const { data } = await axios.get(API_ENDPOINTS.CATEGORIES);
  return data;
}

export async function getProducts(currentPage) {
  const skip = (currentPage - 1) * 12;

  const { data } = await axios.get(
    `${API_ENDPOINTS.PRODUCTS}?limit=${PER_PAGE}&skip=${skip}`
  );
  return data;
}

export async function getProductsByCategory(category, currentPage) {
  const skip = (currentPage - 1) * 12;
  const { data } = await axios.get(
    `${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}${category}?limit=${PER_PAGE}&skip=${skip}`
  );
  return data;
}

export async function getProductById(id) {
  const { data } = await axios.get(
    `${API_ENDPOINTS.PRODUCT_BY_ID}${id}`
  );
  return data;
}
