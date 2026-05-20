import {
  isProductInCart,
  updateCartCount,
  updateWishlistCount,
} from './helpers';

export function setIdToStorage(id, key) {
  if (!isProductInCart(id)) {
    const arrOfId = getIdFromStorage(key) || [];
    arrOfId.push(id);
    localStorage.setItem(`${key}`, JSON.stringify(arrOfId));
    if (key === 'cart') {
      updateCartCount(arrOfId.length);
    } else if (key === 'wishlist') {
      updateWishlistCount(arrOfId.length);
    }
  }
}
export function getIdFromStorage(key) {
  return JSON.parse(localStorage.getItem(`${key}`));
}
export function removeIdFromCart(id, key) {
  const cart = getIdFromStorage(`${key}`);
  const filteredCart = cart.filter(el => el !== id);
  localStorage.setItem(`${key}`, JSON.stringify(filteredCart));
  updateCartCount(filteredCart.length);
}
export function initCart() {
  const cart = getIdFromStorage('cart') || [];
  localStorage.setItem(`cart`, JSON.stringify(cart));
  updateCartCount(cart.length);
}
export function removeIdFromWishList(id, key) {
  const wishlist = getIdFromStorage(`${key}`);
  const filteredWishlist = wishlist.filter(el => el !== id);
  localStorage.setItem(`${key}`, JSON.stringify(filteredWishlist));
  updateWishlistCount(filteredWishlist.length);
}
export function initWishlist() {
  const wishlist = getIdFromStorage('wishlist') || [];
  localStorage.setItem(`wishlist`, JSON.stringify(wishlist));
  updateWishlistCount(wishlist.length);
}
export function clearCart() {
  localStorage.removeItem('cart');
}
export function setThemeStore(theme) {
  localStorage.setItem('theme', theme);
}
export function getThemeStore() {
  return localStorage.getItem('theme');
}
