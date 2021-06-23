import { combineReducers } from 'redux';
import getUser from '../components/Login/reducer';
import getBoard from '../components/Content/SingleBoard/reducer';
import checkEmail from '../components/EditBoard/reducer';
import checkModalOpen from '../components/Modal/reducer';
import getBoardBody from '../components/EditBoard/CreateColumn/reducer';

const rootReducer = combineReducers({
  getUser,
  getBoard,
  checkEmail,
  checkModalOpen,
  getBoardBody,
});

export default rootReducer;
