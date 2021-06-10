import React from 'react';
import { useForm } from 'react-hook-form';
import { FirebaseContext } from '../FirebaseApi';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

function Registrarion() {
  const firebase = React.useContext(FirebaseContext);
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    firebase
      .registration(data.mail, data.password)
      .then((data) => {
        firebase.db.ref(`db/users/user/${data.user.uid}`).child('email').set(`${data.user.email}`);
        firebase.addEmailField(data.user.email, data.user.uid);
        history.push('/login');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='registration'>
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('mail')} placeholder='Mail' />
        <input {...register('password')} placeholder='Password' />

        <input type='submit' />
      </form>
    </div>
  );
}

export default Registrarion;
