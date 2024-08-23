import{c as I,P as O}from"./constants-D72KXPuJ.js";function D(){const c=document.querySelector(".inner"),s=document.querySelector(".row"),E=document.querySelector(".cart"),p=document.querySelector(".lable-enter"),m=document.querySelector(".list-product-in-cart"),g=document.querySelector(".list-cards");return{innerNode:c,rowNode:s,cartNode:E,navTabsEnter:p,listProductCart:m,listCardsOnCartPage:g,render:function(e){Array.isArray(e)?e.forEach(n=>{this.listProduct(n)}):console.error("Expected an array of products but got:",e)},renderCardProduct:function(e){e?c.innerHTML=`

    <a class="top-area__btn-return" href="/"> &lt; Список товаров</a>

        <div class="top-area" id=${e.id}>
            <div class="top-area_card">
              <div class="top-area_wrapper-img">
                <img class="top-area_img" src="${e.img}" alt="${e.brand}">
              </div>
            </div>
            <div class="about-device">
              <h5 class="top-area_brand">${e.brand}</h5>
              <h5 class="top-area_model">${e.model}</h5>
              <h5 class="top-area_rating">Рейтинг &#9733 &#9733 &#9733 &#9733 &#9734</h5>
              <p class="top-area_price">$ ${e.price}</p>
              <p class="top-area_shortDescription">${e.shortDescription}</p>
              <div class="btn-add-in-cart cart-btn ">
                <div><img src="./images/Icon-in-cart.svg" alt=""></div>
                <p>Корзина</p>
              </div>
            </div>
        </div>

        <div class="gorizont-line"></div>

        <div class="bottom-area">
          <div class="description-wrapper">
            <p class="title-description">Описание</p>
            <p class="description-text">${e.fullDescription}</p>
          </div>
        </div>
      `:console.error("Element with class 'inner' not found.")},listProduct:function(e){const n=document.createElement("div");n.classList.add("card"),n.setAttribute("id",e.id);const r=document.createElement("div");r.classList.add("card__inner");const v=document.createElement("div");v.classList.add("img-wrapper");const f=document.createElement("img");f.classList.add("img"),f.src=e.img;const i=document.createElement("div");i.classList.add("discription");const o=document.createElement("p");o.classList.add("brand"),o.innerText=e.brand;const _=document.createElement("p");_.classList.add("model"),_.innerText=e.model;const d=document.createElement("div");d.classList.add("price-cart");const h=document.createElement("div");h.classList.add("price"),h.innerText=`$ ${e.price}`;const l=document.createElement("div");l.classList.add("cart-btn");const b=document.createElement("img");b.classList.add("img"),b.src="./images/cart.svg",v.append(f),r.append(v),n.append(r),l.append(b),d.append(h),d.append(l),i.append(o),i.append(_),i.append(d),n.append(i),s.append(n)},renderUser:function(e){e?p.innerText=e.email:p.innerText="Войти"},renderProductCart:function(e){m&&(this.listProductCart.innerHTML="",e.forEach(n=>{const r=document.createElement("div");r.classList.add("card"),r.innerHTML=`
            <img class="top-area_img" src="${n.img}" alt="${n.brand}">
            <div class="sumTotal"></div>
          `,m.appendChild(r)}))},renderCardsListOnPage:function(e){!window.location.pathname==="/cart.html"||!g||(this.listCardsOnCartPage.innerHTML="",e.forEach(n=>{const r=document.createElement("div");r.classList.add("card"),r.setAttribute("data-id",n.id),r.innerHTML=`
                    <div class="card__img">
                        <img class="img-product" src="${n.img}" alt="${n.brand}">
                    </div>
                    <div class="card__info">
                        <p class="card__brand">${n.brand}</p>
                        <p class="card__model">${n.model}</p>
                        <p class="card__description">${n.shortDescription}</p>
                        <p class="card__rating">Рейтинг &#9733 &#9733 &#9733 &#9733 &#9734</p>
                        <div class="card__price">
                            <div class="card__wrapper-price">
                              <span>$</span>
                              <div class="price">${n.price} x <span class="price-count">0</span></div>
                              <button class="btn-delete-product"> <img src="./images/delete_product.svg" alt=""> </button>
                            </div>
                            
                            <div class="quantity">
                                <button class="quantity__minus js-quantity__minus"> - </button>
                                <p class="quantity__count js-quantity__count"> 0 </p>
                                <button class="quantity__plus js-quantity__plus"> + </button>
                            </div>
                        </div>
                    </div>
        `,g.appendChild(r)}))}}}let w=[];document.addEventListener("DOMContentLoaded",j);function j(){const c=D(),s=I(O),E=document.querySelector(".row"),p=document.querySelector(".js-nav-tab_enter"),m=document.querySelector(".js-nav-tab_exit"),g=document.querySelector(".js-nav-tab_cart"),e=document.querySelector(".inner"),n=document.querySelector(".loader-container");function r(){n.style.display="flex"}function v(){n.style.display="none"}window.addEventListener("beforeunload",r),window.addEventListener("load",v);function f(){return JSON.parse(localStorage.getItem("cart"))||[]}function i(){const t=f();c.renderProductCart(t),c.renderCardsListOnPage(t)}i();const o=localStorage.getItem("user");function _(){if(o){const t=JSON.parse(o);c.renderUser(t)}else console.log("No user data in localStorage.")}_();function d(){s.initAuthListener(t=>{t?c.renderUser(t):console.log("No user is signed in.")})}d();function h(){if(E)return s.pull().then(t=>{Array.isArray(t)?(w=t,c.render(w),E.addEventListener("click",function(a){const C=a.target.closest(".cart-btn");if(C){a.stopPropagation();const L=C.closest(".card");if(L){const S=L.id,P=w.find(y=>y.id===S);P&&(l(P),i())}}else b(a)})):console.error("Expected an array of products but got:",t)}),w}h();function l(t){let a=JSON.parse(localStorage.getItem("cart"))||[];a.push(t),localStorage.setItem("cart",JSON.stringify(a))}function b(t){let a=t.target;for(;a&&!a.classList.contains("card");)a=a.parentElement;if(a&&a.classList.contains("card")){const u=a.id;window.location.href=`/eCommerce_App/product.html?id=${u}`}}const q=document.body.classList.contains("product-page");function T(){if(q){const a=new URLSearchParams(window.location.search).get("id");a&&s.pullOneDocument(a).then(u=>{c.renderCardProduct(u);function C(S){const y=S.target.closest(".cart-btn");if(y){const $=y.closest(".top-area");$&&$.id===u.id&&(l(u),i())}}function L(){window.location.pathname==="/product.html"&&e.addEventListener("click",C)}L()})}}T(),m.addEventListener("click",()=>{s.signOut().then(()=>{localStorage.removeItem("user"),N(),window.location.href="/eCommerce_App/index.html"}),c.renderUser().catch(t=>{console.error("Error signing out:",t)})});function N(){localStorage.setItem("cart",JSON.stringify([])),c.renderCardProduct([]),c.renderCardsListOnPage([])}g.addEventListener("click",x);function x(t){t.preventDefault(),console.log("Navigating to /cart.html"),window.location.href="/eCommerce_App/cart.html"}p.addEventListener("click",A);function A(t){t.preventDefault(),window.location.href="/eCommerce_App/login.html"}}export{D as c};
