import React from 'react';
import { useForm } from 'react-hook-form';
import { FirebaseContext } from '../FirebaseApi';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

function Login() {
  const firebase = React.useContext(FirebaseContext);
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    firebase.login(data.mail, data.password);
    history.push('/home');
  };

  return (
    <div className='login'>
      <h1>Логин</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('mail')} placeholder='Mail' />
        <input {...register('password')} placeholder='Password' />

        <input type='submit' />
      </form>
    </div>
  );
}

export default Login;
