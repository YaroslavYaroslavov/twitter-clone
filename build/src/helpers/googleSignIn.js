import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { onValue, ref, set } from 'firebase/database';
import { auth, db, dbUserReference } from 'firebaseConfig/firebase';
export const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(({ user }) => {
        onValue(dbUserReference, (snapshot) => {
            const data = snapshot.val() || {};
            const usersCount = Object.keys(data).length;
            if (user.uid in data)
                return;
            set(ref(db, `users/${user.uid}`), {
                username: user.displayName,
                avatar: user.photoURL,
                userId: user.uid,
                userlink: `id${usersCount + 1}`,
                phone: user.phoneNumber,
                description: '',
            });
        });
    })
        .catch(console.error);
};
