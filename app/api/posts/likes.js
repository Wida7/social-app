import firebaseApp from "../../firebase/credenciales";
import {
  getFirestore,
  getDoc,
  doc,
  updateDoc
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

export async function getLikes(uid) {
  
  try {
    const docRef = doc(firestore, `users/${uid}`)
    const document = await getDoc(docRef);
    return document.data().likes
  } catch (error) {
    console.log(error);
  }

}


export async function postLikes(uid, data) {

try {
  const docRef = await doc(firestore, `users/${uid}`)
  //const document = await getDoc(docRef);
  console.log(data);
  await updateDoc(docRef, { likes: data })
  //const res = document.data().likes;

  //console.log(document.data());
} catch (error) {
  console.log(error);
}



}

