import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';

// Development Tooling
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'utils/action-logger';

const middlewares = [thunk];
let composer = compose;

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  if (process.env.NODE_ENV !== 'production') {
    composer = composeWithDevTools;
  }
}

const configureStore = (initialState) => {
  const composedCreateStore = composer(applyMiddleware(...middlewares))(createStore);
  const store = composedCreateStore(rootReducer, initialState);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
