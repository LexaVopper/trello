import React from 'react';
import AllBoards from './components/Content/AllBoards/AllBoards';
import Workspace from './components/Content/Workspace/Workspace';
import { Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FirebaseContext } from './components/FirebaseApi';
import { useDispatch } from 'react-redux';
import { getUser } from './components/Login/action';

import NavBar from './components/NavBar/NavBar';
import Edit from './components/EditBoard/Edit';
import Login from './components/Login/Login';
import Registrarion from './components/Registration/Registrarion';

function App() {
  const dispatch = useDispatch();
  const firebase = React.useContext(FirebaseContext);

  const [user, loading] = useAuthState(firebase.auth);

  React.useEffect(() => {
    let id = user?.uid;
    id && dispatch(getUser(id));
  }, [user]);

  return loading ? (
    <div>Загрузка</div>
  ) : (
    <div className='wrapper'>
      <NavBar />
      <Route path='/login' component={Login} />
      <Route path='/registration' component={Registrarion} />

      <Route
        path='/home'
        render={() => (
          <div className='container'>
            <Workspace /> <AllBoards />
          </div>
        )}
      />
      <Route path='/edit/:id' component={Edit} />
    </div>
  );
}

export default App;
