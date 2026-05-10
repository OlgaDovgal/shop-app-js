import { all } from 'axios';
import { PER_PAGE } from './constants';
import { getCategoris, getProducts, getProductsByCategory, getProductById } from './products-api';
import {
  hideLoader,
  hideLoadMoreBtn,
  hideNotFound,
  renderCategory,
  renderProducts,
  showLoader,
  showLoadMoreBtn,
  showNotFound,
  clearProductList,
  renderInfoProduct,
} from './render-function';
import { openModal } from './modal';
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

export async function filterProducts(event) {
  if (event.target.nodeName !== "BUTTON") return;
        document
    .querySelectorAll('.categories__btn').forEach(item => item.classList.remove("categories__btn--active"))
  
  event.target.classList.add('categories__btn--active');
  const category = event.target.textContent;

  try {
    clearProductList();
    showLoader();
    hideLoadMoreBtn();
    hideNotFound();
    const { products, skip, total } = category === "all" ? await getProducts(currentPage) : await getProductsByCategory(category, currentPage);

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

export async function showInfoProduct(event) {
  if (event.target.parentElement.nodeName !== "LI") return;
  const id = event.target.parentElement.dataset.id;
  try {
    if (id) {
      const product = await getProductById(id);
      if (product) {
        openModal();
        renderInfoProduct(product);
      }
    }
    
  } catch (error) {
    console.log(error);
  }
}

