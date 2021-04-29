import React from 'react';
import AllBoards from './components/Content/AllBoards/AllBoards';
import Workspace from './components/Content/Workspace/Workspace';

import NavBar from './components/NavBar';

function App() {
  return (
    <div className='wrapper'>
      <NavBar />
      <div className='container'>
        <Workspace />
        <AllBoards />
      </div>
    </div>
  );
}

export default App;
