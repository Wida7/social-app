import firebaseApp from "../../firebase/credenciales";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const provider = new GoogleAuthProvider();

//=> Función para verificar inicio de sesión en firebase
export async function logInService(email, password) {
  
  const userInfo = await signInWithEmailAndPassword(
    auth,
    email,
    password
  ).then((firebaseUser) => {
    return firebaseUser;
  });

  const userInfoFS = await getUserInfo(userInfo.user.uid)
  
  const currentUser = {
    email: userInfo.user.email,
    name: auserInfoFS.name,
    id: userInfo.user.uid,
    avatar: userInfoFS.avatar
  }

  return currentUser;
}

export async function logInServiceGoogle(email, password) {

  try {
    const userInfo = await signInWithPopup(auth, provider).then((firebaseUser) => {
      return firebaseUser;
    });
    console.log(userInfo.user);

    
    
    const docRef = await doc(firestore, `users/${userInfo.user.uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, { avatar: userInfo.user.photoURL }); 
    } else {
      await setDoc(docRef, { name: userInfo.user.displayName, avatar: userInfo.user.photoURL });
    }

    const userInfoFS = await getUserInfo(userInfo.user.uid)

    const currentUser = {
      email: userInfo.user.email,
      name: userInfoFS.name,
      id: userInfo.user.uid,
      avatar: userInfoFS.avatar
    }

    return currentUser;
  } catch (e) {
    console.log(e);
  }
  
}


async function getUserInfo(uid) {
  const docRef = doc(firestore, `users/${uid}`);
  const docuCif = await getDoc(docRef);
  const res = docuCif.data();

  return res;
}
