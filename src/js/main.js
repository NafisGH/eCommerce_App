import "../scss/styles.scss";
import * as bootstrap from "bootstrap";
import { createFirebase } from "./firebase";
import { PRODUCTS_FIREBASE_KEY } from "./constants";
import { createView } from "./view";

const view = createView()
const firebase = createFirebase(PRODUCTS_FIREBASE_KEY);

firebase.pull().then((products) => {
  view.render(products);
  console.log(products);
});
