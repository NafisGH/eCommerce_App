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
    console.log("User is signed in from localStorage:", user);
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

  if (rowNode) {
    firebase.pull().then((products) => {
      view.render(products);
    });
    rowNode.addEventListener("click", selectCart);
  }

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
    firebase.signOut()
      .then(() => {
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  });

  jsNavTabEnter.addEventListener("click", signInhandler);

  function signInhandler() {
    window.location.href = "login.html"
  }
}
