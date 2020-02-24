import { put, takeLatest, call, all, debounce, cancelled, select, takeEvery } from 'redux-saga/effects';
import { fetchRepos as fetchReposAPI, createReguestCancellation } from 'api/repos/repos';
import {
  getParams,
  repositoriesLoadSuccess,
  repositoriesLoadError,
  repositoriesLoadRequest,
  filterRepos,
  repositoriesLoadStart,
  setPage,
  SET_QUERY,
  REPOSITORIES_LOAD_REQUEST,
  SET_PAGE
} from 'reducers/repos/repos';

const QUERY_CHANGE_DEBOUNCE_DELAY = 300;

export function* fetchRepositories() {
  const { token, cancel } = yield call(createReguestCancellation);
  try {
    const params = yield select(getParams);
    const cachedResults = yield select(filterRepos, params.query, params.page);
    const hasCachedResults = cachedResults && cachedResults.items.length;

    if (!hasCachedResults && params.query) {
      yield put(repositoriesLoadStart());
      const data = yield call(fetchReposAPI, params, token);
      yield put(repositoriesLoadSuccess(data));
    }
  } catch (error) {
    yield put(repositoriesLoadError(error && error.message));
  } finally {
    if (yield cancelled()) {
      cancel();
    }
  }
}

export function* requestRepositoriesLoad() {
  yield put(repositoriesLoadRequest());
}

export function* resetPage() {
  yield put(setPage(1));
}

export function* watchRepositoriesLoadRequest() {
  yield takeLatest(REPOSITORIES_LOAD_REQUEST, fetchRepositories);
}

export function* watchParamsChange() {
  yield debounce(QUERY_CHANGE_DEBOUNCE_DELAY, [SET_QUERY, SET_PAGE], requestRepositoriesLoad);
}

export function* watchPageChange() {
  yield takeEvery(SET_QUERY, resetPage);
}

export default function* rootSaga() {
  yield all([watchParamsChange(), watchRepositoriesLoadRequest(), watchPageChange()]);
}
