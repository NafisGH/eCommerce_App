import "../scss/styles.scss";
import * as bootstrap from "bootstrap";
import { createFirebase } from "./firebase";
import { PRODUCTS_FIREBASE_KEY } from "./constants";
import { createView } from "./view";

const view = createView();
const firebase = createFirebase(PRODUCTS_FIREBASE_KEY);
const rowNode = document.querySelector(".row");

// Этот Прослушивание события означает, что наш скрипт начнет работать, как только структура HTML документа будет готова.
document.addEventListener("DOMContentLoaded", () => {

  if (rowNode) {
    firebase.pull().then((products) => {
      view.render(products);
    });
    rowNode.addEventListener("click", selectCart);
  }

  function selectCart(e) {
    let target = e.target;

    // Проверяем, был ли клик внутри элемента с классом 'col-md-3' если нет то мы поднимаемся выше по DOM дереву с помощью while
    // target &&: Это условие проверяет, что target не null и не undefined.
    // Если target станет null или undefined, это означает, что мы достигли вершины дерева DOM (то есть, выше нет родительских элементов).
    // target.classList.contains('col-md-3'): Это условие проверяет, что текущий элемент (target) не имеет класс col-md-3.
    while (target && !target.classList.contains("col-md-3")) {
      // target = target.parentElement: Эта строка обновляет target, устанавливая его в родительский элемент текущего target.
      target = target.parentElement;
    }

    if (target && target.classList.contains("col-md-3")) {
      // console.log("ID карточки по которой кликнули", target.id);
      const idCard = target.id;
      // Переход на страницу с продуктом и передача ID в URL
      window.location.href = `product.html?id=${idCard}`;
    }
  }

  // Проверка, на какой странице находится пользователь, содержит ли элемент <body> класс product-page
  const isProductPage = document.body.classList.contains("product-page");

  if (isProductPage) {
    //создаем объект URLSearchParams, используя текущую строку запроса window.location.search 
    const urlParams = new URLSearchParams(window.location.search);
    // Извлечение параметра id из URL
    const productId = urlParams.get("id");

    if (productId) {
      firebase.pullOneDocument(productId).then((product) => {
        view.renderCardProduct(product);
      });
    }
  }
});
