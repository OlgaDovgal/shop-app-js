import { initHome, filterProducts, showInfoProduct } from './js/handlers';
import refs from './js/refs';

document.addEventListener('DOMContentLoaded', initHome);
refs.categorisEls.addEventListener('click', filterProducts);
refs.productsEls.addEventListener('click', showInfoProduct);