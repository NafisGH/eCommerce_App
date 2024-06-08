
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDkKrAM_rH0E8fwwdmpG5Gx8OPhwuTiywg",
  authDomain: "ecomerce-project-40a48.firebaseapp.com",
  projectId: "ecomerce-project-40a48",
  storageBucket: "ecomerce-project-40a48.appspot.com",
  messagingSenderId: "874009609927",
  appId: "1:874009609927:web:efb42b106139955432a0e2",
  measurementId: "G-KCG3D09TY3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export function createFirebase(key) {
  return {
    key,
    db,
    auth,
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
        return docSnap.data();
      } else {
        console.log("No such document!");
        return null;
      }
    },
    createUser: async function getCreateUser(email, password) {
      console.log("createUser called with email:", email, "and password:", password);

      try {
        console.log("Attempting to create user...");
        const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
        const user = userCredential.user;
        return user
      } catch (error) {
        console.error("Ошибка при регистрации:", error.code, error.message);
      }
    },
    signIn: async function signInUser(email, password) {
      console.log('-----1');
      try {
        const userCredential = await signInWithEmailAndPassword(this.auth, email, password)
        const user = userCredential.user;
        console.log('signIn', user);
        return user;
      } catch (error) {
        console.error("Ошибка при входе:", error.code, error.message);
      }
    },
    initAuthListener: function (callback) {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          callback(user);
        } else {
          callback(null);
        }
      });
    },
    signOut: function () {
      return this.auth.signOut()
    }
  };
}
