export function createView() {
  const containerNode = document.querySelector(".inner");
  const rowNode = document.querySelector(".row");

  return {
    containerNode,
    rowNode,
    render: function (products) {
      products.forEach((product) => {
        this.listProduct(product);
      });
    },

    renderCardProduct: function (product) {
      containerNode.innerHTML = `

    <a href="/">< Список товаров</a>

        <div class="top-area">
            <div class="top-area_card">
              <div class="top-area_wrapper-img">
                <img class="top-area_img" src="${product.img}" alt="${product.brand}">
              </div>
            </div>
            <div class="about-device">
              <h5 class="top-area_brand">${product.brand}</h5>
              <h5 class="top-area_model">${product.model}</h5>
              <h5 class="top-area_rating">Рейтинг *****</h5>
              <p class="top-area_price">$ ${product.price}</p>
              <p class="top-area_shortDescription">${product.shortDescription}</p>
              <div class="top-area_btn-in-cart">
                <div><img src="/images/Icon_cart.svg" alt=""></div>
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
    },

    listProduct: function (product) {
      const divCol = document.createElement("div");
      divCol.classList.add("col-md-3");
      divCol.setAttribute("id", product.id);

      const divCard = document.createElement("div");
      divCard.classList.add("card");

      const divCardBody = document.createElement("div");
      divCardBody.classList.add("card-body");

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
      imgSvgCart.src = "/images/cart.svg";

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
  };
}
