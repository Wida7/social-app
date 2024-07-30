import firebaseApp from "../../firebase/credenciales";
import {
  getFirestore,
  Timestamp,
  addDoc,
  collection,
} from "firebase/firestore";

const firestore = getFirestore(firebaseApp);


//=>Función para agregar post a la colección de posts
export async function addPost(dataPost) {
  try {
    const res = await addDoc(collection(firestore, "posts"), {
      date: Timestamp.now(),
      description: dataPost.description,
      image64: dataPost.image64,
      likes: 0,
      userId: dataPost.userId,
    })
      .then()
      .catch((e) => console.log(e));

    return res;
  } catch (error) {
    console.log(error);
  }
}
