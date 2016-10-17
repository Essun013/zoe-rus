import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

// import todoApp from './reducers/home/reducers';
import store from './reducers'

const middleware = applyMiddleware(thunk);

export default (data = {}) => {
    const rootReducer = combineReducers({
        ...store
    })

    return createStore(rootReducer, data, middleware)
}
