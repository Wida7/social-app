import firebaseApp from "../../firebase/credenciales";
import { getFirestore, getDoc, doc, updateDoc } from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

//=> Función para cambiar foto de perfil del usuario
export async function changueAvatar(data) {
    try {
        //console.log(data);
        const docRef = await doc(firestore, `users/${data.uid}`);
        
        return await updateDoc(docRef, { avatar: data.image64 });
      } catch (error) {
        console.log(error);
      }
}