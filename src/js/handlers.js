import { PER_PAGE } from './constants';
import { getCategoris, getProducts } from './products-api';
import {
  hideLoader,
  hideLoadMoreBtn,
  hideNotFound,
  renderCategory,
  renderProducts,
  showLoader,
  showLoadMoreBtn,
  showNotFound,
} from './render-function';
let currentPage = 1;

export async function initHome() {
  try {
    showLoader();
    hideLoadMoreBtn();
    hideNotFound();
    const category = await getCategoris();
    if (category.length > 0) {
      const allCategory = ['all', ...category];
      renderCategory(allCategory);
      document
        .querySelector('.categories__btn')
        .classList.add('categories__btn--active');
    }
    const { products, skip, total } = await getProducts(currentPage);
    if (products.length > 0) {
      renderProducts(products);
      if (total - skip - PER_PAGE > 0) {
        showLoadMoreBtn();
      }
    } else {
      showNotFound();
    }
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
}
