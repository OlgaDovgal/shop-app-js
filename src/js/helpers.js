import refs from './refs';
import { getIdFromStorage, getThemeStore } from './storage';

export function isProductInCart(id) {
  const cart = getIdFromStorage('cart') || [];
  return cart.includes(id);
}
export function updateCartCount(count) {
  refs.spanCountCart.setAttribute('data-cart-count', count);
  refs.spanCountCart.textContent = count;
}
export function isProductInWishlist(id) {
  const wishlist = getIdFromStorage('wishlist') || [];
  return wishlist.includes(id);
}
export function updateWishlistCount(count) {
  refs.spanCountWishlist.setAttribute('data-wishlist-count', count);
  refs.spanCountWishlist.textContent = count;
}
export function updateItemsCountInCart(count) {
  refs.spanCountItemsInCart.setAttribute('data-count', count);
  refs.spanCountItemsInCart.textContent = count;
}
export function updateTotalCountInCart(count) {
  refs.spanTotalPiceCountInCArt.setAttribute('data-price', count);
  refs.spanTotalPiceCountInCArt.textContent = count;
}
export function countTotalPrice(products) {
  return products.reduce((acc, prod) => (acc += prod.price), 0).toFixed(2);
}
export function applySettedTheme() {
  if (getThemeStore() === 'dark') {
    refs.body.setAttribute('data-theme', 'dark');
  } else {
    refs.body.removeAttribute('data-theme');
  }
}
