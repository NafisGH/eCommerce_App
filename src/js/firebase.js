import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkKrAM_rH0E8fwwdmpG5Gx8OPhwuTiywg",
  authDomain: "ecomerce-project-40a48.firebaseapp.com",
  projectId: "ecomerce-project-40a48",
  storageBucket: "ecomerce-project-40a48.appspot.com",
  messagingSenderId: "874009609927",
  appId: "1:874009609927:web:efb42b106139955432a0e2",
  measurementId: "G-KCG3D09TY3",
};

export function createFirebase(key) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return {
    key,
    db,
    pull: async function get() {
      try {
        const querySnapshot = await getDocs(collection(this.db, this.key));
        const products = [];

        querySnapshot.forEach((doc) => {
          products.push({
            id: doc.id,
            img: doc.data().img,
            brand: doc.data().brand,
            model: doc.data().model,
            price: doc.data().price,
          });
        });
        return products;
      } catch (error) {
        console.log("Ошибка при получении данных", error);
      }
      
    },
  };
}
