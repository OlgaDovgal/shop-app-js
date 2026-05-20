import {
  initWishlistPage,
  onAddTocartBtnClick,
  onAddToWishListBtnClick,
  onChangeThemeBtnClick,
  onScrollPage,
  onScrollUpBtnClick,
  showInfoProduct,
} from './js/handlers';
import refs from './js/refs';

document.addEventListener('DOMContentLoaded', initWishlistPage);
refs.productsEls.addEventListener('click', showInfoProduct);
refs.addTocartBtnModal.addEventListener('click', onAddTocartBtnClick);
refs.addToWishListBtn.addEventListener('click', onAddToWishListBtnClick);
refs.changeThemeBtn.addEventListener('click', onChangeThemeBtnClick);
refs.scrollUpBtn.addEventListener('click', onScrollUpBtnClick);
document.addEventListener('scroll', onScrollPage);
