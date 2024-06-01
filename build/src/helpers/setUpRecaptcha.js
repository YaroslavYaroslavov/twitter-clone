import { RecaptchaVerifier } from 'firebase/auth';
import { auth } from 'firebaseConfig/firebase';
export const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
    });
    window.recaptchaVerifier.verify();
};
