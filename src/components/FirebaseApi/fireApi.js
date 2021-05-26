import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBMshJkMaMhMB45xM6OV7xByh8Dp6v8XYY',
  authDomain: 'trello-vopper.firebaseapp.com',
  databaseURL: 'https://trello-vopper-default-rtdb.firebaseio.com',
  projectId: 'trello-vopper',
  storageBucket: 'trello-vopper.appspot.com',
  messagingSenderId: '92171684863',
  appId: '1:92171684863:web:02234c25b2212d9b96b5ca',
};

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.db = firebase.database();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  //firebase.database().ref(`users`).set('www'); Изменить
  registration(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  addBoard() {
    const creator = this.auth.currentUser.uid;
    const name = 'kek';
    let id = Math.round(Math.random() * 100000);

    this.db.ref().child(`db/boards`).child(`${id}`).set({
      name: name,
      people: {
        creator,
      },
    });
    this.db
      .ref()
      .child(`db/users/user/${creator}/boards`)
      .child(`${id}`)
      .set({ id: id, name: name });
  }
  // getUser(data) {
  //   firebase
  //     .login(data.mail, data.password)
  //     .then(() => {
  //       dispatch(getUser());
  //     })
  //     .catch((error) => console.log(error));
  // }

  deleteCustomer(id) {
    if (this.auth.currentUser.isAnonymous) return Promise.resolve();

    const currentId = this.auth.currentUser.uid;
    const customerRef = this.db.ref(`${currentId}/customers/${id}`);
    return customerRef.remove();
  }
}

export default new Firebase();
