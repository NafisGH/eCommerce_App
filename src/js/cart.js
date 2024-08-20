// import { products } from "./main";
import { createView } from "./view";

document.addEventListener("DOMContentLoaded", function () {
  const jsQuantityMinus = document.querySelectorAll(".js-quantity__minus");
  const jsQuantityCount = document.querySelectorAll(".js-quantity__count");
  const jsQuantityPlus = document.querySelectorAll(".js-quantity__plus");
  const priceCount = document.querySelectorAll(".price-count");
  const price = document.querySelectorAll(".price");
  const listCardsOnCartPage = document.querySelector(".list-cards");

  const view = createView();

  // Функция увеличения количества
  function plusCount() {
    jsQuantityPlus.forEach((btn, index) => {
      btn.addEventListener("click", function () {
        let count = parseInt(jsQuantityCount[index].textContent);
        count++;
        jsQuantityCount[index].textContent = count;
        priceCount[index].textContent = count;
      });
    });
  }
  plusCount();
  // __________________________________________________________________

  // Функция уменьшения количества
  function minusCount() {
    jsQuantityMinus.forEach((btn, index) => {
      btn.addEventListener("click", function () {
        let count = parseInt(jsQuantityCount[index].textContent);
        if (count > 0) {
          count--;
          jsQuantityCount[index].textContent = count;
          priceCount[index].textContent = count;
        }
      });
    });
  }
  minusCount();
  // __________________________________________________________________

  // Получаю список товаров из localStorage которые в корзине
  function getCartFromLocalStorage() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  // Делегирование событий для удаления продукта
  listCardsOnCartPage.addEventListener("click", deleteProduct);

  // Функция удаления продукта из корзины
  function deleteProduct(e) {
    if (e.target.closest(".btn-delete-product")) {
      const card = e.target.closest(".card");
      const productId = card.getAttribute("data-id");

      // Получаем текущую корзину из localStorage если null тогда возвращается пустой массив
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      
      // Фильтруем корзину, чтобы удалить выбранный продукт
      cart = cart.filter((product) => product.id !== productId);

      // Сохраняем обновленный массив в localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Перерисовываем список карточек на странице
      view.renderCardsListOnPage(cart); // на боковой панели
      view.renderProductCart(cart); // на главной странице корзины
      console.log(cart);
    }
  }
  // __________________________________________________________________

  function sumTotal() {
    // Получаем текущую корзину из localStorage если null тогда возвращается пустой массив
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cart)

     let sumCart = cart.reduce((sum, current)=> {
       return sum + current.price 
    }, 0)
    return sumCart
  }

  const sum = sumTotal()
  console.log(sum)
});
