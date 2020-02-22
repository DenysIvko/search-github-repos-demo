import { fetchRepos as fetchReposApi } from 'api/repos/repos';

/* ACTION CONSTANTS */

export const SET_REPOS = 'SET_REPOS';
export const SET_REPOS_LOADING = 'SET_REPOS_LOADING';
export const SET_QUERY = 'SET_QUERY';

/* REDUCER */

const initialState = {
  query: '',
  byQuery: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REPOS: {
      return {
        ...state,
        query: action.payload.key,
        byQuery: {
          ...state.byQuery,
          [action.payload.key]: action.payload.data
        },
        loading: false
      };
    }
    case SET_REPOS_LOADING: {
      return {
        ...state,
        loading: action.payload
      };
    }
    case SET_QUERY: {
      return {
        ...state,
        query: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

/* SELECTORS */

export const getCurrentState = (state) => {
  return state.repos;
};

export const getLastResults = (state) => {
  const { query } = getCurrentState(state);
  return getByQuery(state, query);
};

export const getQuery = (state) => {
  const { query } = getCurrentState(state);
  return query;
};

export const getCachedQueries = (state) => {
  const { byQuery } = getCurrentState(state);
  return Object.keys(byQuery);
};

export const getByQuery = (state, query) => {
  const { byQuery } = getCurrentState(state);
  return byQuery[query];
};

/* ACTION CREATORS */

export const setRepos = (key, data) => {
  return {
    type: SET_REPOS,
    payload: {
      key,
      data
    }
  };
};

export const setReposLoading = (loading) => {
  return {
    type: SET_REPOS_LOADING,
    payload: loading
  };
};

export const setQuery = (query) => {
  return {
    type: SET_QUERY,
    payload: query
  };
};

/* THUNKS */

export const fetchRepos = (params) => {
  return async (dispatch, getState) => {
    const state = getState();
    const cachedResults = getByQuery(state, params.query);

    dispatch(setReposLoading(true));

    if (cachedResults) {
      dispatch(setReposLoading(false));
      return Promise.resolve(cachedResults);
    }

    const reposData = await fetchReposApi(params);
    dispatch(setRepos(params.query, reposData));
    dispatch(setReposLoading(false));
    return reposData;
  };
};
