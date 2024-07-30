import firebaseApp from "../../firebase/credenciales";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { getUserInfo } from "../user/getUserInfo";

const firestore = getFirestore(firebaseApp);

//=> Función para obtener todos los post de la colección
export const getPosts = async (lastVisible) => {
  let q;
  let data = [];

  //=> Obtener post con un limite para evitar cargar todos de una sola vez
  if (lastVisible) {
    q = query(
      collection(firestore, "posts"),
      orderBy("date", "desc"),
      startAfter(lastVisible),
      limit(10)
    );
  } else {
    q = query(
      collection(firestore, "posts"),
      orderBy("date", "desc"),
      limit(10)
    );
  }

  //q = query(collection(firestore, "posts"), orderBy("date", "desc"));

  //=> Obtengo los documentos
  const posts = await getDocs(q);

  //=> recorro los documentos para cruzar la información del post con la del usuario que la creo y retornar el objeto del post
  const posts_userInfo = posts.docs.map(async (doc) => {
    const post = doc.data();
    const infoUserPost = await getUserInfo(post.userId);

    return {
      id: doc.id,
      ...post,
      name: infoUserPost.name,
      avatar: infoUserPost.avatar,
    };
  });

  //=> Esperamos a que todas las promesas se resuelvan
  data = await Promise.all(posts_userInfo);

  //=> referencio la última posición en la que quedo la consulta, para saber cuando se deben cargar los siguientes
  const newLastVisible = posts.docs[posts.docs.length - 1];

  //console.log(data);

  //=> hasMore = validación para saber si hay más datos para cargar
  return { data, newLastVisible, hasMore: posts.docs.length === 10 };
};
