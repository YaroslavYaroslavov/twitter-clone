import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

export interface StateInterface {
  auth: Auth;
  firestore: Firestore;
}
