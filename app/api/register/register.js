import firebaseApp from "../../firebase/credenciales";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

//=> Función para registrar el usuario en firebase
export async function registerService(email, password, name) {
  const userInfo = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  ).then((firebaseUser) => {
    return firebaseUser;
  });

  const docRef = doc(firestore, `users/${userInfo.user.uid}`);
  setDoc(docRef, { name: name, avatar: "", likes: [] });

  return userInfo;
}
