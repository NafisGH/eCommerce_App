import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

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
    pullOneDocument: async function getDocument(id) {
      const docRef = doc(this.db, this.key, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data()
        // console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        return null; // Возвращаем null, если документ не найден
      }
    },
  };
}
