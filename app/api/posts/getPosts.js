import firebaseApp from "../../firebase/credenciales";
import {
  getFirestore,
  getDoc,
  getDocs,
  collection,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

async function getUser(uid) {
  const docRef = doc(firestore, `users/${uid}`);
  const docuCif = await getDoc(docRef);
  const res = docuCif.data();

  //console.log(res);

  return {
    name: res?.name,
    avatar: res?.avatar,
  };
}

export async function getPosts() {
  let data = [];

  const q = query(collection(firestore, "posts"), orderBy("date", "desc"));

  const posts = await getDocs(q);

  const posts_userInfo = posts.docs.map(async (doc) => {
    const post = doc.data();
    const infoUserPost = await getUser(post.userId);

    return {
      id: doc.id,
      ...post,
      name: infoUserPost.name,
      avatar: infoUserPost.avatar,
    };
  });

  // Esperamos a que todas las promesas se resuelvan
  data = await Promise.all(posts_userInfo);

  //console.log(data);
  return data;
}
