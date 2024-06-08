import "../scss/styles.scss";
import { createFirebase } from "./firebase";
import { PRODUCTS_FIREBASE_KEY } from "./constants";

document.addEventListener("DOMContentLoaded", handleRegistrationPage);

const firebase = createFirebase(PRODUCTS_FIREBASE_KEY);

function handleRegistrationPage() {
  const registrationForm = document.querySelector(".registration");
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
        // Сохранение данных пользователя в localStorage
        localStorage.setItem("user", JSON.stringify(user)); 

        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000); // Задержка 2 секунды перед перенаправлением
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  }
}
