import firebaseApp from "../../firebase/credenciales";
import {
  getFirestore,
  Timestamp,
  addDoc,
  collection,
} from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

export async function addPost(dataPost) {
    const res = await addDoc(collection(firestore, "posts"), {
      date: Timestamp.now(),
      description: dataPost.description,
      image64: dataPost.image64,
      likes: 0,
      userId: dataPost.userId,
    }).then().catch((e) => console.log(e))

    return res
}