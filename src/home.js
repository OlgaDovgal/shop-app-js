import {
  initHome,
  filterProducts,
  showInfoProduct,
  searchProductsByName,
  onSearchFormBtnClear,
  onLoadMoreBtnClick,
  onAddTocartBtnClick,
  onAddToWishListBtnClick,
  onChangeThemeBtnClick,
} from './js/handlers';
import refs from './js/refs';

document.addEventListener('DOMContentLoaded', initHome);
refs.categorisEls.addEventListener('click', filterProducts);
refs.productsEls.addEventListener('click', showInfoProduct);
refs.searchFormEl.addEventListener('submit', searchProductsByName);
refs.searchFormBtnClearInput.addEventListener('click', onSearchFormBtnClear);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
refs.addTocartBtnModal.addEventListener('click', onAddTocartBtnClick);
refs.addToWishListBtn.addEventListener('click', onAddToWishListBtnClick);
refs.changeThemeBtn.addEventListener('click', onChangeThemeBtnClick);
