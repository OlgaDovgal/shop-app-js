import {
  initCartPage,
  onAddTocartBtnClick,
  onAddToWishListBtnClick,
  onBuyProductsBtnClick,
  onChangeThemeBtnClick,
  showInfoProduct,
} from './js/handlers';
import refs from './js/refs';

document.addEventListener('DOMContentLoaded', initCartPage);
refs.productsEls.addEventListener('click', showInfoProduct);
refs.addToWishListBtn.addEventListener('click', onAddToWishListBtnClick);
refs.addTocartBtnModal.addEventListener('click', onAddTocartBtnClick);
refs.buyProductsBtn.addEventListener('click', onBuyProductsBtnClick);
refs.changeThemeBtn.addEventListener('click', onChangeThemeBtnClick);
