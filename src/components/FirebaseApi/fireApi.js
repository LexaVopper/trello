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

  addBoard(name, color) {
    const creator = this.auth.currentUser.uid;
    let id = Math.round(Math.random() * 100000);
    this.db.ref().child(`db/boards`).child(`${id}`).set({
      name: name,
      color: color,
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

  addEmailField(email, id) {
    this.db.ref().child(`db/emails`).child(`${id}`).set(`${email}`);
  }

  sendInvite(creator, boardId) {
    this.db.ref().child(`db/users/user/${creator}/invite`).child(`${boardId}`).set({ id: boardId });
  }
}

export default new Firebase();
