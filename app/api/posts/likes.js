import firebaseApp from "../../firebase/credenciales";
import { getFirestore, getDoc, doc, updateDoc } from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

//=> Función para obtener los likes del usuario
export async function getLikes(uid) {
  try {
    const docRef = doc(firestore, `users/${uid}`);
    const document = await getDoc(docRef);
    return document.data().likes;
  } catch (error) {
    console.log(error);
  }
}

//=> Función para enviar la información del like que dió el ususario
export async function postLikes(uid, data) {
  try {
    const docRef = await doc(firestore, `users/${uid}`);
    //console.log(data);
    await updateDoc(docRef, { likes: data });
  } catch (error) {
    console.log(error);
  }
}

//=> Función para agregar/quitar likes y actualizar el estado
export const addLike = async (postId, like, idCurrentUser, setDataPosts) => {
  //console.log(postId, like, idCurrentUser, setDataPosts);

  try {
    const postRef = doc(firestore, "posts", postId);
    const postSnapshot = await getDoc(postRef);

    if (postSnapshot.exists) {
      //=> aumento o disminuyo el like del usuario
      const newLikes = postSnapshot.data().likes + (like ? 1 : -1);

      //=> Actualiza los likes del post
      const existingUserlikes = postSnapshot.data().userslike || {};
      const updatedUserlikes = {
        ...existingUserlikes,
        [idCurrentUser]: like,
      };
      //console.log("ACTUALIZADOS", updatedUserlikes);

      await updateDoc(postRef, {
        likes: newLikes,
        userslike: updatedUserlikes,
      });

      //=> Actualiza el estado local para reflejar el cambio inmediatamente
      setDataPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: newLikes } : post
        )
      );

      return { postId, liked: like };
    }
  } catch (error) {
    console.log(error);
  }

  return <div>likes</div>;
};
