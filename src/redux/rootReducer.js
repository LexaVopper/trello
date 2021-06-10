import { combineReducers } from 'redux';
import getUser from '../components/Login/reducer';
import getBoard from '../components/Content/SingleBoard/reducer';
import checkEmail from '../components/EditBoard/reducer';
import checkModalOpen from '../components/Modal/reducer';

const rootReducer = combineReducers({
  getUser,
  getBoard,
  checkEmail,
  checkModalOpen,
});

export default rootReducer;
