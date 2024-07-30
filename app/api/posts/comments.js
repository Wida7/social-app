import firebaseApp from "../../firebase/credenciales";
import { v4 as uuidv4 } from "uuid";
import {
  getFirestore,
  Timestamp,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";

const firestore = getFirestore(firebaseApp);


//=> Función para agregar comentario en el array del post
export async function addComment(idPost, comment) {
  try {
    const newComment = {
      comment: comment.comment,
      user: comment.user,
      avatar: comment.avatar,
      idComment: uuidv4(),
      idUser: comment.idUser,
      date: Timestamp.now(),
    };

    const commentListRef = doc(firestore, "posts", `${idPost}`);

    const res = await updateDoc(commentListRef, {
      comments: arrayUnion(newComment),
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}
