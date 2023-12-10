import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from 'firebaseConfig/firebase';

export const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).catch(console.error);
};
