import "../scss/styles.scss";
import { createFirebase } from "./firebase";
import { PRODUCTS_FIREBASE_KEY } from "./constants";
import { createView } from "./view";

document.addEventListener("DOMContentLoaded", handleRegistrationPage);

const firebase = createFirebase(PRODUCTS_FIREBASE_KEY);

const view = createView();

function handleRegistrationPage() {
  const registrationForm = document.querySelector(".registrationForm");
  const emailNode = document.querySelector(".email");
  const passwordNode = document.querySelector(".password");

  if (registrationForm && emailNode && passwordNode) {
    registrationForm.addEventListener("submit", registrationUser);
  } else {
    console.error("Form elements not found");
  }

  async function registrationUser(event) {
    event.preventDefault();

    const email = emailNode.value.trim();
    const password = passwordNode.value.trim();

    if (!email || !password) {
      return;
    } else {
      try {
        const user = await firebase.createUser(email, password);
        console.log("User UID:------------", user);
        view.renderUser(user)
        // setTimeout(() => {
        //   // window.location.href = "index.html";
        //     view.renderUser(user)
        // }, 5000); // Задержка 2 секунды перед перенаправлением
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  }
}
