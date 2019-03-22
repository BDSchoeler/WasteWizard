import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import createHistory from 'history/createBrowserHistory'

const history = createHistory();

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const middleware = [
  thunk,
  routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));


export default function configureStore() {
  return createStore(
    rootReducer,
    undefined,
    enhancers
  );
}
