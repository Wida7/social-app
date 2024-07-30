import firebaseApp from "../../firebase/credenciales";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { getUserInfo } from "../user/getUserInfo";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const provider = new GoogleAuthProvider();

//=> Función para verificar inicio de sesión en firebase con email/contraseña
export async function logInService(email, password) {
  try {
    const userInfo = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).then((firebaseUser) => {
      return firebaseUser;
    });

    const userObjectFormat = await userObject(userInfo.user.uid, userInfo);

    return userObjectFormat;
  } catch (error) {
    console.log(error);
  }
}

//=> Función para verificar inicio de sesión en firebase con cuenta de Google
export async function logInServiceGoogle(email, password) {
  try {
    const userInfo = await signInWithPopup(auth, provider).then(
      (firebaseUser) => {
        return firebaseUser;
      }
    );
    //console.log(userInfo.user);

    const docRef = await doc(firestore, `users/${userInfo.user.uid}`);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        name: userInfo.user.displayName,
        avatar: userInfo.user.photoURL,
      });
    }

    const userObjectFormat = await userObject(userInfo.user.uid, userInfo);

    return userObjectFormat;
  } catch (e) {
    console.log(e);
  }
}


//=> Función para darle formato al objeto usuario
const userObject = async (uid, data) => {
  const info = await getUserInfo(uid);

  const currentUser = {
    email: data.user.email,
    name: info.name,
    id: data.user.uid,
    avatar: info.avatar,
  };

  return currentUser;
};
