import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

export default function configureStore(initialState) {
    // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancer = compose(
        applyMiddleware(thunkMiddleware),
        DevTools.instrument()
    );

    const store = createStore(
        rootReducer,
        initialState,
        enhancer
    );

    return store;
}
