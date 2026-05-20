export default {
  categorisEls: document.querySelector('.categories'),
  productsEls: document.querySelector('.products'),
  modalEl: document.querySelector('.modal'),
  modalInfo: document.querySelector('.modal-product'),
  modalCloseBtn: document.querySelector('.modal__close-btn'),
  searchFormEl: document.querySelector('.search-form'),
  searchFormBtnClearInput: document.querySelector('.search-form__btn-clear'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  addTocartBtnModal: document.querySelector('.modal-product__btn--cart'),
  spanCountCart: document.querySelector('.nav__count[data-cart-count]'),
  addToWishListBtn: document.querySelector('.modal-product__btn--wishlist'),
  spanCountWishlist: document.querySelector('.nav__count[data-wishlist-count]'),
  spanCountItemsInCart: document.querySelector(
    '.cart-summary__value[data-count]'
  ),
  spanTotalPiceCountInCArt: document.querySelector(
    '.cart-summary__value[data-price]'
  ),
  buyProductsBtn: document.querySelector('.cart-summary__btn'),
  changeThemeBtn: document.querySelector('.theme-toggle-btn'),
  scrollUpBtn: document.querySelector('.scroll-top-btn'),
  body: document.querySelector('body'),
};
