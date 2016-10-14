import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

// import {app} from './modules';

import todoApp from './reducers/reducers';

const middleware = applyMiddleware(thunk);

export default (data = {}) => {
    // const rootReducer = combineReducers({
    //     [app.NAME]: app.reducer
    // })

    return createStore(todoApp, data, middleware)
}
