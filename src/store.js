import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, thunk];
const storeEnhancer = composeWithDevTools(applyMiddleware(...middlewares));
const store = createStore(rootReducer, storeEnhancer);
sagaMiddleware.run(rootSaga);


export default store;