export function createView() {
  const containerNode = document.querySelector(".container");
  const rowNode = document.querySelector(".row");

  return {
    containerNode,
    rowNode,
    render: function (products) {
      products.forEach((product) => {
        this.addProduct(product);
      });
    },
    addProduct: function (product) {

      const divCol = document.createElement("div");
      divCol.classList.add("col-md-3");

      const divCard = document.createElement("div");
      divCard.classList.add("card");

      const divCardBody = document.createElement("div");
      divCardBody.classList.add("card-body");

      const img = document.createElement("img");
      img.classList.add("img");
      img.src = product.img
    

      const divDiscription = document.createElement("div");
      divDiscription.classList.add("discription");

      const pBrand = document.createElement("p");
      pBrand.classList.add("brand");
      pBrand.innerText = product.brand;
      console.log('product.brand', product.brand);

      const pModel = document.createElement("p");
      pModel.classList.add("model");
      pModel.innerText = product.model;

      const divPriceCart = document.createElement("div");
      divPriceCart.classList.add("price-cart");

      const divPrice = document.createElement("div");
      divPrice.classList.add("price");
      divPrice.innerText = product.price;

      const divCartBtn = document.createElement("div");
      divCartBtn.classList.add("cart-btn");

      const imgSvgCart = document.createElement("img");
      imgSvgCart.classList.add("img");
      imgSvgCart.src = "/images/cart.svg";


      divCardBody.append(img)
      divCard.append(divCardBody)
      divCol.append(divCard)

      divCartBtn.append(imgSvgCart)
      divPriceCart.append(divPrice)
      divPriceCart.append(divCartBtn)
      divDiscription.append(pBrand)
      divDiscription.append(pModel)
      divDiscription.append(divPriceCart)
      divCol.append(divDiscription)

      rowNode.append(divCol)
    },
  };
}
