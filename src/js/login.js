import "../scss/styles.scss";
import { createFirebase } from "./firebase";
import { PRODUCTS_FIREBASE_KEY } from "./constants";

const loginForm = document.querySelector(".loginForm");
const emailNode = loginForm.querySelector(".email");
const passwordNode = loginForm.querySelector(".password");

document.addEventListener("DOMContentLoaded", handleRegistrationPage);

const firebase = createFirebase(PRODUCTS_FIREBASE_KEY);

function handleRegistrationPage() {
  if (loginForm) {
    loginForm.addEventListener("submit", loginUser);
  }

  async function loginUser(event) {
    event.preventDefault();

    const email = emailNode.value.trim();
    const password = passwordNode.value.trim();

    if (!email || !password) {
      return;
    }

    try {
      const user = await firebase.signIn(email, password);
      localStorage.setItem("user", JSON.stringify(user));
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    } catch (error) {}
  }
}
