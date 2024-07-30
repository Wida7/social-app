import firebaseApp from "../../firebase/credenciales";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

//=> Función para obtener los datos del usuario de Firestore
export async function getUserInfo(uid) {
  try {
    const docRef = doc(firestore, `users/${uid}`);
    const docuCif = await getDoc(docRef);
    const res = docuCif.data();

    return res;
  } catch (error) {
    console.log(error);
  }
}
