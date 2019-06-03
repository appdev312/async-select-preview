import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import simpleReducer from './simpleReducer';

export default combineReducers({
  toastr: toastrReducer,
  simpleReducer,  
});
