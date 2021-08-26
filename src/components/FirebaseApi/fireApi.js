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

  registration(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  addBoard(name, color) {
    const creator = this.auth.currentUser.uid;
    const id = Math.round(Math.random() * 100000);
    this.db.ref().child(`db/boards`).child(`${id}`).set({
      name,
      color,
      people: {
        creator,
      },
    });
    this.db
      .ref()
      .child(`db/users/user/${creator}/boards`)
      .child(`${id}`)
      .set({ id, name });
  }

  addColumn(title, boardId, columnPosition, id) {
    this.db
      .ref()
      .child(`db/boards/${boardId}`)
      .child(`columns/${id}`)
      .set({ id, title, board: boardId, position: columnPosition });
  }

  addTask(title, columnId, boardId, columnPosition, id) {
    this.db
      .ref()
      .child(`db/boards/${boardId}/task/${id}`)
      .set({ id, title, position: columnPosition });

    this.db
      .ref()
      .child(`db/boards/${boardId}/columns/${columnId}/tasksId/${id}`)
      .set({ id, position: columnPosition });
  }

  changeColomns(boardId, newColumnsList) {
    Object.values(newColumnsList).forEach((column) => {
      this.db.ref().child(`db/boards/${boardId}/columns/${column.id}`).update({
        position: column.position,
      });
    });
  }

  changeTaskInBoard(boardId, tasksList) {
    Object.values(tasksList).forEach((task) => {
      this.db.ref().child(`db/boards/${boardId}/task/${task.id}`).update({
        position: task.position,
      });
    });
  }

  changeTaskTitle(boardId, taskId, newTitle) {
    this.db.ref().child(`db/boards/${boardId}/task/${taskId}`).update({
      title: newTitle,
    });
  }

  addTaskDescription(boardId, taskId, newDescription) {
    this.db.ref().child(`db/boards/${boardId}/task/${taskId}`).update({
      description: newDescription,
    });
  }

  createTag(boardId, colorTag, titleTag, tagId) {
    this.db.ref().child(`db/boards/${boardId}/tags/${tagId}`).update({
      id: tagId,
      title: titleTag,
      color: colorTag,
    });
  }

  createСheck(boardId, titleCheck, checkId, taskId) {
    this.db
      .ref()
      .child(`db/boards/${boardId}/task/${taskId}/checks/${checkId}`)
      .update({
        id: checkId,
        title: titleCheck,
      });
    this.db.ref().child(`db/boards/${boardId}/checks/${checkId}`).update({
      id: checkId,
      title: titleCheck,
    });
  }

  copyСheck(boardId, check, checkId, taskId) {
    this.db
      .ref()
      .child(`db/boards/${boardId}/task/${taskId}/checks/${checkId}`)
      .update({
        id: check.id,
        title: check.title,
      });
    this.db
      .ref()
      .child(`db/boards/${boardId}/checks`)
      .update({
        [checkId]: check,
      });
  }

  changeСheckTitle(boardId, title, checkId, taskId) {
    this.db
      .ref()
      .child(`db/boards/${boardId}/task/${taskId}/checks/${checkId}`)
      .update({
        title,
      });
    this.db.ref().child(`db/boards/${boardId}/checks/${checkId}`).update({
      title,
    });
  }

  deleteСheck(boardId, checkId, taskId) {
    this.db
      .ref()
      .child(`db/boards/${boardId}/task/${taskId}/checks/${checkId}`)
      .set({});
    this.db.ref().child(`db/boards/${boardId}/checks/${checkId}`).set({});
  }

  deleteTag(boardId, tagId) {
    this.db
      .ref()
      .child(`db/boards/${boardId}/tags/${tagId}`)
      .set({ tagId: {} });
  }

  changeTaksBetweenBoards(
    boardId,
    tasksList,
    fColumnId,
    sColumnId,
    fromColumn,
    toColumn
  ) {
    Object.values(tasksList).forEach((task) => {
      this.db.ref().child(`db/boards/${boardId}/task/${task.id}`).update({
        position: task.position,
      });
    });
    if (fromColumn?.tasksId) {
      this.db.ref().child(`db/boards/${boardId}/columns/${fColumnId}`).update({
        tasksId: fromColumn?.tasksId,
      });
    } else {
      this.db
        .ref()
        .child(`db/boards/${boardId}/columns/${fColumnId}/tasksId`)
        .set({
          tasksId: {},
        });
    }

    this.db.ref().child(`db/boards/${boardId}/columns/${sColumnId}`).update({
      tasksId: toColumn?.tasksId,
    });
  }

  addEmailField(email, id) {
    this.db.ref().child(`db/emails`).child(`${id}`).set(`${email}`);
  }

  sendInvite(creator, boardId) {
    this.db
      .ref()
      .child(`db/users/user/${creator}/invite`)
      .child(`${boardId}`)
      .set({ id: boardId });
  }

  tieTagWithTask(boardId, taskId, tagId) {
    this.db
      .ref()
      .child(`db/boards/${boardId}/task/${taskId}/tags`)
      .update({ [tagId]: { id: tagId } });
  }

  deleteTagFromTask(boardId, taskId, tagId) {
    this.db
      .ref()
      .child(`db/boards/${boardId}/task/${taskId}/tags`)
      .update({ [tagId]: {} });
  }
}

export default new Firebase();
