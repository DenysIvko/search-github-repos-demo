import { combineReducers } from 'redux';

import repos from 'reducers/repos/repos';

const rootReducer = combineReducers({
  repos
});

export default rootReducer;
