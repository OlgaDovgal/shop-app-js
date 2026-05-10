import"./assets/styles-COSbD4d6.js";import{a as c}from"./assets/vendor-N5iQpiFS.js";const p="https://dummyjson.com",r={CATEGORIES:"/products/category-list",PRODUCTS:"/products"},a=12;c.defaults.baseURL=p;async function m(){const{data:t}=await c.get(r.CATEGORIES);return t}async function _(t){const o=(t-1)*12,{data:e}=await c.get(`${r.PRODUCTS}?limit=${a}&skip=${o}`);return e}const i={categorisEls:document.querySelector(".categories"),productsEls:document.querySelector(".products")};function f(t){const o=t.map(e=>`<li class="categories__item">
   <button class="categories__btn" type="button">${e}</button>
 </li>`).join("");i.categorisEls.innerHTML=o}function g(t){const o=t.map(({id:e,thumbnail:n,title:s,brand:d,category:u,price:l})=>`
        <li class="products__item" data-id="${e}">
    <img class="products__image" src="${n}" alt="${s}"/>
    <p class="products__title">${s}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${d}</span></p>
    <p class="products__category">Category: ${u}</p>
    <p class="products__price">Price: ${l}</p>
 </li>`).join("");i.productsEls.insertAdjacentHTML("beforeend",o)}function y(){document.querySelector(".loader").classList.remove("is-hidden")}function L(){document.querySelector(".load-more-btn").classList.remove("is-hidden")}function b(){document.querySelector(".loader").classList.add("is-hidden")}function S(){document.querySelector(".load-more-btn").classList.add("is-hidden")}function h(){document.querySelector(".not-found").classList.add("not-found--visible")}function E(){document.querySelector(".not-found").classList.remove("not-found--visible")}let $=1;async function P(){try{y(),S(),E();const t=await m();if(t.length>0){const s=["all",...t];f(s),document.querySelector(".categories__btn").classList.add("categories__btn--active")}const{products:o,skip:e,total:n}=await _($);o.length>0?(g(o),n-e-a>0&&L()):h()}catch(t){console.error(t)}finally{b()}}document.addEventListener("DOMContentLoaded",P);
//# sourceMappingURL=index.js.map
