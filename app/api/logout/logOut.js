import firebaseApp from "../../firebase/credenciales"
import { getAuth } from 'firebase/auth'
const auth = getAuth(firebaseApp)

export function logOut() {
  return signOut(auth)
}
