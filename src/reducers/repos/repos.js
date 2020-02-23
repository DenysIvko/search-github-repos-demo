import { fetchRepos as fetchReposApi } from 'api/repos/repos';

const getHashFor = (a, b) => a + '_' + b;

/* ACTION CONSTANTS */

export const SET_REPOS = 'SET_REPOS';
export const SET_REPOS_LOADING = 'SET_REPOS_LOADING';
export const SET_QUERY = 'SET_QUERY';
export const SET_PAGE = 'SET_PAGE';

/* REDUCER */

const initialState = {
  query: '',
  page: 1,
  resultsByHash: {},
  byId: {},
  queries: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REPOS: {
      return {
        ...state,
        query: action.payload.key,
        page: action.payload.data.params.page,
        byId: {
          ...state.byId,
          ...action.payload.data.items.reduce((acc, item) => {
            return {
              ...acc,
              [item.id]: item
            };
          }, {})
        },
        queries: {
          ...state.queries,
          [action.payload.key]: ''
        },
        resultsByHash: {
          ...state.resultsByHash,
          [getHashFor(action.payload.data.params.query, action.payload.data.params.page)]: {
            total: action.payload.data.total,
            params: action.payload.data.params,
            items: action.payload.data.items.map((item) => item.id)
          }
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
    case SET_PAGE: {
      return {
        ...state,
        page: action.payload
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
  const { query, page } = getCurrentState(state);
  return filterRepos(state, query, page);
};

export const getQuery = (state) => {
  const { query } = getCurrentState(state);
  return query;
};

export const getPage = (state) => {
  const { page } = getCurrentState(state);
  return page;
};

export const getCachedQueries = (state) => {
  const { queries } = getCurrentState(state);
  return Object.keys(queries);
};

export const filterRepos = (state, query, page = 1) => {
  const { resultsByHash, byId } = getCurrentState(state);
  const hash = getHashFor(query, page);

  if (!resultsByHash[hash]) {
    return undefined;
  }

  const { items, params, total } = resultsByHash[hash];

  return {
    items: items.map((id) => byId[id]),
    params,
    total
  };
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

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: page
  };
};

/* THUNKS */

export const fetchRepos = (params) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch(setQuery(params.query));
    dispatch(setPage(params.page));
    const cachedResults = filterRepos(state, params.query, params.page);

    dispatch(setReposLoading(true));

    if (cachedResults && cachedResults.items && cachedResults.items.length) {
      dispatch(setReposLoading(false));
      return null;
    }

    const reposData = await fetchReposApi(params);
    dispatch(setRepos(params.query, reposData));
    dispatch(setReposLoading(false));
    return reposData;
  };
};
