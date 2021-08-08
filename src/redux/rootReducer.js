import { combineReducers } from 'redux';
import getUser from '../components/Login/reducer';
import getBoard from '../components/Content/SingleBoard/reducer';
import checkEmail from '../components/EditBoard/reducer';
import checkModalOpen from '../components/Modal/reducer';
import { filter } from '../components/EditBoard/TaskInfo/SideBar/reducer';

const rootReducer = combineReducers({
  getUser,
  getBoard,
  checkEmail,
  checkModalOpen,
  filter,
});

export default rootReducer;
