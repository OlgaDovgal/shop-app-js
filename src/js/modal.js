import { isProductInCart } from './helpers';
import refs from './refs';
import { getIdFromStorage } from './storage';

export function openModal() {
  refs.modalEl.classList.add('modal--is-open');
  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', onEscape);
  refs.modalEl.addEventListener('click', onBackDrop);
  refs.modalCloseBtn.addEventListener('click', onCloseBtn);
}
export function closeModal() {
  refs.modalEl.classList.remove('modal--is-open');
  document.body.style.overflow = '';
  window.removeEventListener('keydown', onEscape);
  refs.modalEl.removeEventListener('click', onBackDrop);
  refs.modalCloseBtn.removeEventListener('click', onCloseBtn);
}

function onEscape(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}
function onBackDrop(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}
function onCloseBtn(event) {
  if (event.target.nodeName === 'BUTTON') {
    closeModal();
  }
}
