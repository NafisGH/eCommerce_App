// import "../scss/styles.scss";
// import { createFirebase } from "./firebase";
// import { PRODUCTS_FIREBASE_KEY } from "./constants";
// import { createView } from "./view";

// const view = createView();
// const firebase = createFirebase(PRODUCTS_FIREBASE_KEY);
// const rowNode = document.querySelector(".row");

// const registrationForm = document.querySelector(".registrationForm");
// const emailNode = document.querySelector(".email");
// const passwordNode = document.querySelector(".password");

// document.addEventListener("DOMContentLoaded", () => {
//   console.log("DOMContentLoaded event fired");

//   registrationForm.addEventListener("submit", registrationUser);

//   async function registrationUser(event) {
//     event.preventDefault();

//     const email = emailNode.value.trim();
//     const password = passwordNode.value.trim();

//     if (!email && !password) {
//       console.log("return createUser");
//       return;
//     } else {
//       try {
//         console.log("createUser");
//        const userUidClient = await firebase.createUser(email, password).then((userUid) => {
//           console.log("userUid-------->", userUid);

//         });
//         console.log("userUidClient",userUidClient);
//         window.location.href = "index.html";
//       } catch (error) {
//         console.error('Ошибка при createUser', error);
//       }
//     }
//   }

//   if (rowNode) {
//     firebase.pull().then((products) => {
//       view.render(products);
//     });
//     rowNode.addEventListener("click", selectCart);
//   }

//   function selectCart(e) {
//     let target = e.target;

//     while (target && !target.classList.contains("col-md-3")) {
//       target = target.parentElement;
//     }

//     if (target && target.classList.contains("col-md-3")) {
//       const idCard = target.id;
//       window.location.href = `product.html?id=${idCard}`;
//     }
//   }

//   const isProductPage = document.body.classList.contains("product-page");

//   if (isProductPage) {
//     const urlParams = new URLSearchParams(window.location.search);
//     const productId = urlParams.get("id");

//     if (productId) {
//       firebase.pullOneDocument(productId).then((product) => {
//         view.renderCardProduct(product);
//       });
//     }
//   }
// });

import "../scss/styles.scss";
import { createFirebase } from "./firebase";
import { PRODUCTS_FIREBASE_KEY } from "./constants";
import { createView } from "./view";

document.addEventListener("DOMContentLoaded", handleMainPage);

function handleMainPage() {
  const view = createView();
  const firebase = createFirebase(PRODUCTS_FIREBASE_KEY);
  const rowNode = document.querySelector(".row");

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


}
