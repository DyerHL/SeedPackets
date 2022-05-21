import { getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { auth } from './APIKeys';
import axios from 'axios';

const baseUrl = "https://localhost:7027/Api/";

const userExisitsinDB = () => new Promise((resolve, reject) => {
    const idToken = sessionStorage.getItem("token");
    axios.get(`${baseUrl}/User/Auth`, { headers: { Authorization: "Bearer " + idToken, idToken: idToken}})
    .then(response => resolve((response)))
    .catch(reject);
});

const signInUser = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signOutUser = () =>
  new Promise((resolve, reject) => {
    getAuth().signOut().then(resolve).catch(reject);
  });

  export { 
    userExisitsinDB,
    signInUser, 
    signOutUser
};