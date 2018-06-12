import { combineReducers } from 'redux'
import userReducer from './user.reducer'
import chatReducer from './chat.reducer'
import configReducer from './config.reducer'

export default combineReducers({
  user: userReducer,
  chat: chatReducer,
  config: configReducer,
});
