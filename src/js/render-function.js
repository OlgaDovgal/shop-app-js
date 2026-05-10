import refs from './refs';

export function renderCategory(arrCat) {
  const markup = arrCat
    .map(
      cat => `<li class="categories__item">
   <button class="categories__btn" type="button">${cat}</button>
 </li>`
    )
    .join('');
  refs.categorisEls.innerHTML = markup;
}
export function renderProducts(arrProd) {
  const markup = arrProd
    .map(
      ({ id, thumbnail, title, brand, category, price }) => `
        <li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${brand}</span></p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: ${price}</p>
 </li>`
    )
    .join('');
  refs.productsEls.insertAdjacentHTML('beforeend', markup);
}
export function showLoader() {
  document.querySelector('.loader').classList.remove('is-hidden');
}
export function showLoadMoreBtn() {
  document.querySelector('.load-more-btn').classList.remove('is-hidden');
}
export function hideLoader() {
  document.querySelector('.loader').classList.add('is-hidden');
}
export function hideLoadMoreBtn() {
  document.querySelector('.load-more-btn').classList.add('is-hidden');
}
export function showNotFound() {
  document.querySelector('.not-found').classList.add('not-found--visible');
}
export function hideNotFound() {
  document.querySelector('.not-found').classList.remove('not-found--visible');
}

export function clearProductList() {
  refs.productsEls.innerHTML = "";
}

export function renderInfoProduct({ title, thumbnail, tags, description, price, shippingInformation, returnPolicy}) {
  const markupTags = tags.map(item => `<li>${item}</li>`).join("")
  const markup = `<img class="modal-product__img" src="${thumbnail}" alt="${title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${title}</p>
        <ul class="modal-product__tags">${markupTags}</ul>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information">Shipping: ${shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
        <p class="modal-product__price">Price: ${price}$</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
  `
  refs.modalInfo.innerHTML = markup;
}