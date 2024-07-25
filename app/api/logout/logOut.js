import { postLikes } from "../posts/likes"
import firebaseApp from "../../firebase/credenciales"
import { getAuth, signOut } from 'firebase/auth'
const auth = getAuth(firebaseApp)

export async function logOut(idUser, likesUser) {

  try {
    await postLikes(idUser, likesUser)
  } catch (error) {
    console.log(error);
  }

  return signOut(auth)
}
