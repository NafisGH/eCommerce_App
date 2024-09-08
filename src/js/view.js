export function createView() {


  const innerNode = document.querySelector(".inner"); // product.html
  const rowNode = document.querySelector(".row");
  const cartNode = document.querySelector(".cart");
  const navTabsEnter = document.querySelector(".lable-enter");

  const listProductCart = document.querySelector(".cart__list");
  const listCardsOnCartPage = document.querySelector(".list-cards");

 

  return {
    innerNode,
    rowNode,
    cartNode,
    navTabsEnter,
    listProductCart,
    listCardsOnCartPage,

    render: function (products) {
      if (Array.isArray(products)) {
        products.forEach((product) => {
          this.listProduct(product);
        });
      } else {
        console.error("Expected an array of products but got:", products); // Ожидалось множество продуктов, но получили:
      }
    },
    // Рендер карточки товара
    renderCardProduct: function (product) {
      if (product) {
        innerNode.innerHTML = `

    <a class="top-area__btn-return" href="/eCommerce_App/"> &lt; Список товаров</a>

        <div class="top-area" id=${product.id}>
            <div class="top-area_card">
              <div class="top-area_wrapper-img">
                <img class="top-area_img" src="${product.img}" alt="${product.brand}">
              </div>
            </div>
            <div class="about-device">
              <h5 class="top-area_brand">${product.brand}</h5>
              <h5 class="top-area_model">${product.model}</h5>
              <h5 class="top-area_rating">Рейтинг &#9733 &#9733 &#9733 &#9733 &#9734</h5>
              <p class="top-area_price">$ ${product.price}</p>
              <p class="top-area_shortDescription">${product.shortDescription}</p>
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
            <p class="description-text">${product.fullDescription}</p>
          </div>
        </div>
      `;
      } else {
        console.error("Element with class 'inner' not found.");
      }
    },

    listProduct: function (product) {
      const divCol = document.createElement("div");
      divCol.classList.add("card");
      divCol.setAttribute("id", product.id);

      const divCard = document.createElement("div");
      divCard.classList.add("card__inner");

      const divCardBody = document.createElement("div");
      divCardBody.classList.add("img-wrapper");

      const img = document.createElement("img");
      img.classList.add("img");
      img.src = product.img;

      const divDiscription = document.createElement("div");
      divDiscription.classList.add("discription");

      const pBrand = document.createElement("p");
      pBrand.classList.add("brand");
      pBrand.innerText = product.brand;

      const pModel = document.createElement("p");
      pModel.classList.add("model");
      pModel.innerText = product.model;

      const divPriceCart = document.createElement("div");
      divPriceCart.classList.add("price-cart");

      const divPrice = document.createElement("div");
      divPrice.classList.add("price");
      divPrice.innerText = `$ ${product.price}`;

      const divCartBtn = document.createElement("div");
      divCartBtn.classList.add("cart-btn");

      const imgSvgCart = document.createElement("img");
      imgSvgCart.classList.add("img");
      imgSvgCart.src = "./images/cart.svg";

      divCardBody.append(img);
      divCard.append(divCardBody);
      divCol.append(divCard);

      divCartBtn.append(imgSvgCart);
      divPriceCart.append(divPrice);
      divPriceCart.append(divCartBtn);
      divDiscription.append(pBrand);
      divDiscription.append(pModel);
      divDiscription.append(divPriceCart);
      divCol.append(divDiscription);

      rowNode.append(divCol);
    },
    // Показывает почту вошедшего пользователя
    renderUser: function (user) {
      if (!user) {
        navTabsEnter.innerText = "Войти";
      } else {
        navTabsEnter.innerText = user.email;
      }
    },
    
    

    

    // Рендеринг корзины на боковой панели
    renderProductCart: function (cartProducts) {
      if (!listProductCart) {
        return;
      }
      this.listProductCart.innerHTML = ""; // Очищаем содержимое перед добавлением
      cartProducts.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img class="top-area_img" src="${product.img}" alt="${product.brand}">
            <div class="sumTotal"></div>
          `;
        listProductCart.appendChild(card);
      });
    },

    // Рендеринг товаров добавленных в корзину на главной страницы cart
    renderCardsListOnPage: function (cartProducts) {

      if (!window.location.pathname === "/eCommerce_App/cart.html" || !listCardsOnCartPage) {
        return;
      }
      
      this.listCardsOnCartPage.innerHTML = ""; // Очищаем содержимое перед добавлением
      
      cartProducts.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-id", product.id); // Устанавливаем уникальный идентификатор
        card.innerHTML = `
                    <div class="card__img">
                        <img class="img-product" src="${product.img}" alt="${product.brand}">
                    </div>
                    <div class="card__info">
                        <p class="card__brand">${product.brand}</p>
                        <p class="card__model">${product.model}</p>
                        <p class="card__description">${product.shortDescription}</p>
                        <p class="card__rating">Рейтинг &#9733 &#9733 &#9733 &#9733 &#9734</p>
                        <div class="card__price">
                            <div class="card__wrapper-price">
                              <span>$</span>
                              <div class="price">${product.price} x <span class="price-count">0</span></div>
                              <button class="btn-delete-product"> <img src="./images/delete_product.svg" alt=""> </button>
                            </div>
                            
                            <div class="quantity">
                                <button class="quantity__minus js-quantity__minus"> - </button>
                                <p class="quantity__count js-quantity__count"> 0 </p>
                                <button class="quantity__plus js-quantity__plus"> + </button>
                            </div>
                        </div>
                    </div>
        `;
        listCardsOnCartPage.appendChild(card);
      });
    },
  };
}
