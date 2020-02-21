/* ACTION CONSTANTS */

export const SET_REPOS = 'SET_REPOS';

/* REDUCER */

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REPOS: {
      return {
        ...state,
        ...action.payload
      };
    }
    default: {
      return state;
    }
  }
};

/* SELECTORS */

export const getState = (state) => {
  return state;
};

/* ACTION CREATORS */

export const setRepos = (repos) => {
  return {
    type: SET_REPOS,
    payload: repos
  };
};

/* THUNKS */

export const fetchRepos = (params) => {
  return async (dispatch, getState) => {
    await fetchRepos(params);
  };
};
