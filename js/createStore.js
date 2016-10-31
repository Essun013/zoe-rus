import { Platform } from 'react-native';
import {createStore, applyMiddleware, combineReducers,compose} from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
// import todoApp from './reducers/home/reducers';
import store from './reducers'

const middleware = applyMiddleware(thunk);

export default (data = {}) => {

    const enhancer = compose(
        applyMiddleware(thunk),
        devTools({
            name: Platform.OS,
            hostname: 'localhost',
            port: 5678
        })
    );

    const rootReducer = combineReducers({
        ...store
    })

    //return createStore(rootReducer, data, enhancer)

    return createStore(rootReducer, data, middleware)
}
