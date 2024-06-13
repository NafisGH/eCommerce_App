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

  // Проверка наличия данных пользователя в localStorage
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    view.renderUser(user);
  } else {
    console.log("No user data in localStorage.");
  }

 

  // Инициализация слушателя аутентификации
  firebase.initAuthListener((user) => {
    if (user) {
      view.renderUser(user);
    } else {
      console.log("No user is signed in.");
    }
  });

  // Загрузка корзины из localStorage
  // const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Рендеринг корзины при загрузке страницы
  // view.renderProductCart(cart);

  if (rowNode) {
    firebase.pull().then((products) => {
      view.render(products);

      // Навешивание делегированного обработчика событий на rowNode
      rowNode.addEventListener("click", function (e) {
        // Элемент, на котором был выполнен клик
        const targetElem = e.target;

        // Определяем был ли выполнен клик
        // на одной из кнопок или внутри её
        const buttonElem = targetElem.closest(".cart-btn");

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
    });
  }

  // Функция Логика добавления товара в корзину
  function addToCart(product) {
    // Получаем текущую корзину из localStorage если null тогда возвращается пустой массив
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Добавляем новый товар в корзину
    cart.push(product);

    // Сохраняем обновленную корзину в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Получение корзины из localStorage
  function getCurrentCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

      view.renderProductCart(cart);
      console.log("Current cart:", cart);
  }

  // getCurrentCart()
  // const currentCart = getCurrentCart();
  // view.renderProductCart(currentCart); 

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

  const isProductPage = document.body.classList.contains("product-page");

  if (isProductPage) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId) {
      firebase.pullOneDocument(productId).then((product) => {
        view.renderCardProduct(product);
      });
    }
  }

  // Ф-ия выхода из аккаунта
  logExitBtn.addEventListener("click", () => {
    firebase
      .signOut()
      .then(() => {
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  });

  jsNavTabEnter.addEventListener("click", signInhandler);

  function signInhandler() {
    window.location.href = "login.html";
  }
}
