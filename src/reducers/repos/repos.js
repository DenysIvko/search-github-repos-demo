/*
  `createHashForParams` is a method intended to create uniq hash based on `page` and `query` params.
  With this approach there's no need to have deeply nested state shape, which is a good thing.
  As long as one of params is a number (in our case it's `page`) collisions are impossible to happen.
 */
const createHashForParams = (a, b) => a + '_' + b;

/* ACTION CONSTANTS */

export const REPOSITORIES_LOAD_REQUEST = 'REPOSITORIES_LOAD_REQUEST';
export const REPOSITORIES_LOAD_START = 'REPOSITORIES_LOAD_START';
export const REPOSITORIES_LOAD_SUCCESS = 'REPOSITORIES_LOAD_SUCCESS';
export const REPOSITORIES_LOAD_ERROR = 'REPOSITORIES_LOAD_ERROR';
export const SET_REPOS_LOADING = 'SET_REPOS_LOADING';
export const SET_QUERY = 'SET_QUERY';
export const SET_PAGE = 'SET_PAGE';

/* REDUCER */

const initialState = {
  query: '',
  page: 1,
  error: '',
  resultsByHash: {},
  byId: {},
  queries: {
    // hardcoded suggestions
    angular: '',
    react: '',
    vue: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REPOSITORIES_LOAD_START: {
      return {
        ...state,
        loading: true
      };
    }
    case REPOSITORIES_LOAD_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    }
    case REPOSITORIES_LOAD_SUCCESS: {
      return {
        ...state,
        error: '',
        query: action.payload.params.query,
        page: action.payload.params.page,
        byId: {
          ...state.byId,
          ...action.payload.items.reduce((acc, item) => {
            return {
              ...acc,
              [item.id]: item
            };
          }, {})
        },
        queries: {
          ...state.queries,
          [action.payload.params.query]: ''
        },
        resultsByHash: {
          ...state.resultsByHash,
          [createHashForParams(action.payload.params.query, action.payload.params.page)]: {
            total: action.payload.total,
            params: action.payload.params,
            items: action.payload.items.map((item) => item.id)
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
        page: 1,
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

export const getParams = (state) => {
  const { page, query } = getCurrentState(state);
  return {
    page,
    query
  };
};

export const getCachedQueries = (state) => {
  const { queries } = getCurrentState(state);
  return Object.keys(queries);
};

export const filterRepos = (state, query, page = 1) => {
  const { resultsByHash, byId } = getCurrentState(state);
  const hash = createHashForParams(query, page);

  const { items = [], params = {}, total } = resultsByHash[hash] || {};

  return {
    items: items.map((id) => byId[id]),
    params,
    total
  };
};

/* ACTION CREATORS */

export const repositoriesLoadRequest = () => {
  return {
    type: REPOSITORIES_LOAD_REQUEST
  };
};

export const repositoriesLoadStart = (data) => {
  return {
    type: REPOSITORIES_LOAD_START,
    payload: data
  };
};

export const repositoriesLoadSuccess = (data) => {
  return {
    type: REPOSITORIES_LOAD_SUCCESS,
    payload: data
  };
};

export const repositoriesLoadError = (error) => {
  return {
    type: REPOSITORIES_LOAD_ERROR,
    payload: error
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
