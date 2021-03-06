import { getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { auth } from './APIKeys';
import axios from 'axios';

const baseUrl = "https://localhost:7027/Api";

// CHECKING IF USER EXISTS IN DB, IF THEY DONT A NEW USER SHOULD BE CREATED AND RETURNED
const userExisitsinDB = () => new Promise((resolve, reject) => {
    const idToken = sessionStorage.getItem("token");
    axios.get(`${baseUrl}/User/Auth`, { headers: { Authorization: "Bearer " + idToken }})
    .then(response => resolve((response.data)))
    .catch(reject);
});

// SIGN IN USER
const signInUser = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

// SIGN OUT USER
const signOutUser = () =>
  new Promise((resolve, reject) => {
    getAuth().signOut().then(resolve).catch(reject);
  });

// GET USER BY UID
  const getUserByUid = (uid) => new Promise((resolve, reject) => {
      axios.get(`${baseUrl}/User/${uid}`)
      .then((response) => resolve((response.data)))
      .catch(reject);
  });

// UPDATE USER OBJECT WITH FROST DATE ID
const updateUser = (frostDateObj, uid) => new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/User/${uid}`, frostDateObj)
    .then((response) => resolve(response.data))
    .catch(reject);
});

  export { 
    userExisitsinDB,
    signInUser, 
    signOutUser,
    getUserByUid,
    updateUser
};
