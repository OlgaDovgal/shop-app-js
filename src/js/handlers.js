import { all } from 'axios';
import { PER_PAGE } from './constants';
import {
  getCategoris,
  getProducts,
  getProductsByCategory,
  getProductById,
  getProductsByName,
} from './products-api';
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
import refs from './refs';
import {
  clearCart,
  getIdFromStorage,
  getThemeStore,
  initCart,
  initWishlist,
  removeIdFromCart,
  removeIdFromWishList,
  setIdToStorage,
  setThemeStore,
} from './storage';
import {
  applySettedTheme,
  countTotalPrice,
  isProductInCart,
  isProductInWishlist,
  updateCartCount,
  updateItemsCountInCart,
  updateTotalCountInCart,
} from './helpers';
import iziToast from 'izitoast';
let currentMode = null;
let currentPage = 1;
let currentCAtegory = 'all';
let currentSearchValue = '';

export async function initHome() {
  currentMode = 'all';
  applySettedTheme();
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
      } else {
        hideLoadMoreBtn();
      }
      initCart();
      initWishlist();
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
  currentPage = 1;
  if (event.target.nodeName !== 'BUTTON') return;
  document
    .querySelectorAll('.categories__btn')
    .forEach(item => item.classList.remove('categories__btn--active'));

  event.target.classList.add('categories__btn--active');
  const category = event.target.textContent;
  currentCAtegory = category;
  currentMode = category === 'all' ? 'all' : 'category';

  try {
    clearProductList();
    showLoader();
    hideLoadMoreBtn();
    hideNotFound();
    const { products, skip, total } =
      category === 'all'
        ? await getProducts(currentPage)
        : await getProductsByCategory(category, currentPage);

    if (products.length > 0) {
      renderProducts(products);
      if (total - skip - PER_PAGE > 0) {
        showLoadMoreBtn();
      } else {
        hideLoadMoreBtn();
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
  if (event.target.parentElement.nodeName !== 'LI') return;
  const id = event.target.parentElement.dataset.id;
  try {
    if (id) {
      const product = await getProductById(id);
      if (product) {
        openModal();
        renderInfoProduct(product);
        refs.addTocartBtnModal.textContent = isProductInCart(id)
          ? 'Remove from cart'
          : 'Add to cart';
        refs.addToWishListBtn.textContent = isProductInWishlist(id)
          ? 'Remove from Wishlist'
          : 'Add to Wishlist';
      }
    }
  } catch (error) {
    console.log(error);
  }
}
export async function searchProductsByName(event) {
  event.preventDefault();
  currentMode = 'search';
  currentPage = 1;
  const nameProduct = event.currentTarget.elements.searchValue.value.trim();
  currentSearchValue = nameProduct;
  if (!nameProduct) return;
  try {
    showLoader();
    hideLoadMoreBtn();
    hideNotFound();
    const { products, skip, total } = await getProductsByName(
      nameProduct,
      currentPage
    );
    if (products.length > 0) {
      clearProductList();
      renderProducts(products);
      if (total - skip - PER_PAGE > 0) {
        showLoadMoreBtn();
      } else {
        hideLoadMoreBtn();
      }
    } else {
      clearProductList();
      showNotFound();
    }
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
}
export async function onSearchFormBtnClear(event) {
  currentMode = 'all';
  currentPage = 1;
  const input = event.target.previousElementSibling;
  input.value = '';
  try {
    showLoader();
    hideLoadMoreBtn();
    hideNotFound();
    const { products, skip, total } = await getProducts(currentPage);
    if (products.length > 0) {
      renderProducts(products);
      if (total - skip - PER_PAGE > 0) {
        showLoadMoreBtn();
      } else {
        hideLoadMoreBtn();
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
export async function loadMoreAllProducts() {
  try {
    showLoader();
    hideLoadMoreBtn();
    hideNotFound();
    const { products, skip, total } = await getProducts(currentPage);
    if (products.length > 0) {
      renderProducts(products);
      if (total - skip - PER_PAGE > 0) {
        showLoadMoreBtn();
      } else {
        hideLoadMoreBtn();
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}
export async function loadMoreSearchProducts() {
  try {
    showLoader();
    hideLoadMoreBtn();
    hideNotFound();
    const { products, skip, total } = await getProductsByName(
      currentSearchValue,
      currentPage
    );
    renderProducts(products);
    if (total - skip - PER_PAGE > 0) {
      showLoadMoreBtn();
    } else {
      hideLoadMoreBtn();
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}
export async function loadMoreByCategory() {
  try {
    showLoader();
    hideLoadMoreBtn();
    hideNotFound();
    const { products, skip, total } = await getProductsByCategory(
      currentCAtegory,
      currentPage
    );
    renderProducts(products);
    if (total - skip - PER_PAGE > 0) {
      showLoadMoreBtn();
    } else {
      hideLoadMoreBtn();
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}
export async function onLoadMoreBtnClick() {
  currentPage++;
  switch (currentMode) {
    case 'all':
      loadMoreAllProducts();
      break;
    case 'category':
      loadMoreByCategory();
      break;
    case 'search':
      loadMoreSearchProducts();
      break;
  }
}
export function onAddTocartBtnClick(event) {
  if (event.target.nodeName !== 'BUTTON') return;
  const id = refs.modalInfo.querySelector('.modal-product__content').dataset.id;
  if (!isProductInCart(id)) {
    setIdToStorage(id, 'cart');
    event.target.textContent = 'Remove from Cart';
  } else {
    removeIdFromCart(id, 'cart');
    event.target.textContent = 'Add to cart';
  }
}
export function onAddToWishListBtnClick(event) {
  if (event.target.nodeName !== 'BUTTON') return;
  const id = refs.modalInfo.querySelector('.modal-product__content').dataset.id;
  if (!isProductInWishlist(id)) {
    setIdToStorage(id, 'wishlist');
    event.target.textContent = 'Remove from Wishlist';
  } else {
    removeIdFromWishList(id, 'wishlist');
    event.target.textContent = 'Add to Wishlist';
  }
}
export async function initWishlistPage() {
  initCart();
  initWishlist();
  applySettedTheme();
  const wishlistIds = getIdFromStorage('wishlist') || [];
  if (wishlistIds.length === 0) {
    showNotFound();
    return;
  }
  try {
    hideNotFound();
    const requests = wishlistIds.map(id => getProductById(id));
    const products = await Promise.all(requests);
    if (products.length > 0) {
      renderProducts(products);
    } else {
      showNotFound();
    }
  } catch (error) {
    console.error(error);
  }
}
export async function initCartPage() {
  initCart();
  initWishlist();
  applySettedTheme();
  const cart = getIdFromStorage('cart') || [];
  if (cart.length === 0) {
    showNotFound();
    return;
  }
  updateItemsCountInCart(cart.length);
  try {
    hideNotFound();
    const requests = cart.map(id => getProductById(id));
    const products = await Promise.all(requests);
    if (products.length > 0) {
      renderProducts(products);
      updateTotalCountInCart(countTotalPrice(products));
    } else {
      showNotFound();
    }
  } catch (error) {
    console.error(error);
  }
}
export function onBuyProductsBtnClick() {
  clearCart();
  iziToast.success({
    message: 'Товари придбано успішно!',
    position: 'topRight',
    close: true,
    closeOnEscape: true,
    closeOnClick: true,
  });
}
export function onChangeThemeBtnClick(event) {
  if (event.target.nodeName !== 'BUTTON') return;
  const isDark = refs.body.getAttribute('data-theme') === 'dark';
  if (isDark) {
    refs.body.removeAttribute('data-theme');
    setThemeStore('light');
  } else {
    refs.body.setAttribute('data-theme', 'dark');
    setThemeStore('dark');
  }
}
export function onScrollPage() {
  if (refs.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    refs.scrollUpBtn.classList.add('scroll-top-btn--visible');
  } else {
    refs.scrollUpBtn.classList.remove('scroll-top-btn--visible');
  }
}
export function onScrollUpBtnClick() {
  window.scrollTo({
    top: refs.productsEls.offsetTop,
    behavior: 'smooth',
  });
}
