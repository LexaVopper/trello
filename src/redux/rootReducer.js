import { combineReducers } from 'redux';
import getUser from '../components/Login/reducer';
import getBoard from '../components/Content/SingleBoard/reducer';

const rootReducer = combineReducers({
  getUser,
  getBoard,
});

export default rootReducer;
