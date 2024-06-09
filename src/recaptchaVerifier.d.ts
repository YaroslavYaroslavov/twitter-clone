import { ApplicationVerifier } from 'firebase/auth';

declare global {
  interface Window {
    recaptchaVerifier: ApplicationVerifier;
  }
}
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}