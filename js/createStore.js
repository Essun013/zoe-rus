// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
//
// import { app } from './modules'
//
// const middleware = applyMiddleware(thunk);
//
// export default (data = {}) => {
//   const rootReducer = combineReducers({
//     //every modules reducer should be define here
//     [app.NAME]: app.reducer
//   })
//
//   return createStore(rootReducer, data, middleware)
// }

import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}