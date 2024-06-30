import "../scss/styles.scss";
import { createFirebase } from "./firebase";
import { PRODUCTS_FIREBASE_KEY } from "./constants";
import { createView } from "./view";

document.addEventListener("DOMContentLoaded", handleMainPage);

function handleMainPage() {
  const view = createView();
  const firebase = createFirebase(PRODUCTS_FIREBASE_KEY);
  const rowNode = document.querySelector(".row");
  const jsNavTabEnter = document.querySelector(".js-nav-tab_enter");
  const logExitBtn = document.querySelector(".js-nav-tab_exit");
  const jsNavTabCart = document.querySelector(".js-nav-tab_cart");
  const innerNodeProduct = document.querySelector(".inner");

  const loader = document.querySelector(".loader-container");

  let products = [];

  // Показ лоадера при загрузке страницы и переходе на другую страницу
  function showLoader() {
    loader.style.display = "flex";
  }

  function hideLoader() {
    loader.style.display = "none";
  }

  window.addEventListener("beforeunload", showLoader);
  window.addEventListener("load", hideLoader);
  // __________________________________________________________________

  // Вспомогательная функция для получения данных из localStorage
  function getCartFromLocalStorage() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  // Получение корзины из localStorage и рендеринг товаров
  function getCurrentCart() {
    const cart = getCartFromLocalStorage();
    view.renderProductCart(cart); // на боковой панели
    view.renderCardsListOnPage(cart); // на странице корзины
  }
  getCurrentCart();
  // __________________________________________________________________

  const storedUser = localStorage.getItem("user");
  // Функция Проверка наличия данных пользователя в localStorage
  function checkUserInLocalStorage() {
    if (storedUser) {
      const user = JSON.parse(storedUser);
      view.renderUser(user);
    } else {
      console.log("No user data in localStorage.");
    }
  }
  checkUserInLocalStorage();
  // _________________________________________________________________

  // Функция Инициализация слушателя аутентификации
  function authenticationListenerInitialization() {
    firebase.initAuthListener((user) => {
      if (user) {
        view.renderUser(user);
      } else {
        console.log("No user is signed in.");
      }
    });
  }
  authenticationListenerInitialization();
  // _________________________________________________________________

  // Функция Добавление товаров в корзину
  function addProductsToCart() {
    if (rowNode) {
      firebase.pull().then((fetchedProducts) => {
        if (Array.isArray(fetchedProducts)) {
          products = fetchedProducts;
          view.render(products);

          // Навешивание делегированного обработчика событий на rowNode (тег родитель всех карточек который есть в разметке изначально в index.html)
          rowNode.addEventListener("click", function (e) {
            // Элемент, на котором был выполнен клик
            const targetElem = e.target;

            // Определяем был ли выполнен клик
            // на одной из кнопок или внутри её
            const buttonElem = targetElem.closest(".cart-btn"); // кнопка добавления в корзину

            if (buttonElem) {
              e.stopPropagation();
              // находим ближайшего родителя с классом ".card"
              const cardNode = buttonElem.closest(".card");
              if (cardNode) {
                const productId = cardNode.id;
                const product = products.find((prod) => prod.id === productId);
                if (product) {
                  addToCart(product);
                  getCurrentCart();
                }
              }
            } else {
              selectCart(e);
            }
          });
        } else {
          console.error(
            "Expected an array of products but got:",
            fetchedProducts
          );
        }
      });
      return products;
    }
  }
  addProductsToCart();

  //_________________________________________________________________________

  // Функция добавления товара в корзину
  function addToCart(product) {
    // Получаем текущую корзину из localStorage если null тогда возвращается пустой массив
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Добавляем новый товар в корзину
    cart.push(product);

    // Сохраняем обновленную корзину в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  // _________________________________________________________________________

  // Функция просмотра карточки товара
  function selectCart(e) {
    let target = e.target;

    while (target && !target.classList.contains("card")) {
      target = target.parentElement;
    }
    if (target && target.classList.contains("card")) {
      const idCard = target.id;
      window.location.href = `product.html?id=${idCard}`;
    }
  }
  // _________________________________________________________________________

  const isProductPage = document.body.classList.contains("product-page");

  // Функция получения выбранного товара
  function getSelectedProduct() {
    if (isProductPage) {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get("id");
      if (productId) {
        firebase.pullOneDocument(productId).then((product) => {
          view.renderCardProduct(product);

          // Функция Добавление товара в корзину на странице самой карточки товара
          function handelAddProductInCart(event) {
            // Элемент, на котором был выполнен клик
            const targetElement = event.target;
            const buttonElem = targetElement.closest(".cart-btn");
            if (buttonElem) {
              // находим ближайшего родителя с классом ".top-area"
              const cardTopArea = buttonElem.closest(".top-area");
              if (cardTopArea) {
                const idCard = cardTopArea.id;
                if (idCard === product.id) {
                  addToCart(product);
                  getCurrentCart();
                }
              }
            }
          }
          // _________________________________________________________________________

          // Функция проверки нахожусь ля на странице самой карточки товара, если да то функция срабатывает
          function checkingProductPage() {
            if (window.location.pathname === "/product.html") {
              innerNodeProduct.addEventListener(
                "click",
                handelAddProductInCart
              );
            }
          }
          checkingProductPage();
          // _________________________________________________________________________
        });
      }
    }
  }
  getSelectedProduct();
  // _________________________________________________________________________

  // Функция выхода из аккаунта
  logExitBtn.addEventListener("click", () => {
    firebase.signOut().then(() => {
      // Удаление данных пользователя из localStorage
      localStorage.removeItem("user");
      // Перенаправление на главную страницу
      window.location.href = "index.html";
    });
    view.renderUser().catch((error) => {
      console.error("Error signing out:", error);
    });
  });
  // _________________________________________________________________________

  jsNavTabCart.addEventListener("click", cartHandler);
  function cartHandler() {
    window.location.href = "cart.html";
  }

  // Функция перехода на страницу авторизации
  jsNavTabEnter.addEventListener("click", signInHandler);
  function signInHandler() {
    window.location.href = "login.html";
  }
  // _________________________________________________________________________
}
