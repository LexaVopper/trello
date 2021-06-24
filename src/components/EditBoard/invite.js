/* eslint-disable no-restricted-syntax */
import firebase from '../FirebaseApi/fireApi';

export const busyEmail = () => ({
  type: 'NOT_FOUND_EMAIL',
});

export const checkEmail = (userId) => ({
  type: 'CHECK_EMAIL',
  payload: userId,
});

export const getUserIdByEmail = (correntEmail, boardId) => (dispatch) => {
  firebase.db.ref(`db/emails`).on('value', (data) => {
    let Found = false;
    for (const value in data.val()) {
      if (data.val()[value] === correntEmail.user) {
        Found = true;
        firebase.sendInvite(value, boardId);
        dispatch(checkEmail(value));
      }
    }
    if (Found === false) {
      dispatch(busyEmail());
    }
  });
};
