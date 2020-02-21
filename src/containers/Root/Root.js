import React from 'react';
import { Provider } from 'react-redux';
import store from 'store';
import App from 'containers/App/App';

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;
