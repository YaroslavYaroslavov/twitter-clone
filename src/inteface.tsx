import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

export interface FirebaseContextInterface {
  auth: Auth;
  firestore: Firestore;
}
