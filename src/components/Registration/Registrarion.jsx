import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FirebaseContext } from '../FirebaseApi';

function Registrarion() {
  const firebase = React.useContext(FirebaseContext);
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    firebase
      .registration(data.mail, data.password)
      .then((info) => {
        firebase.db
          .ref(`db/users/user/${info.user.uid}`)
          .child('email')
          .set(`${info.user.email}`);
        firebase.addEmailField(info.user.email, info.user.uid);
        history.push('/login');
      })
      .catch((error) => error);
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
