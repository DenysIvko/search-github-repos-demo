import { put, takeLatest, call, all, throttle, cancelled, select, takeEvery } from 'redux-saga/effects';
import { fetchRepos as fetchReposAPI, createReguestCancellation } from 'api/repos/repos';
import {
  getParams,
  repositoriesLoadSuccess,
  repositoriesLoadError,
  repositoriesLoadRequest,
  SET_QUERY,
  REPOSITORIES_LOAD_REQUEST,
  SET_PAGE
} from 'reducers/repos/repos';

const QUERY_CHANGE_THROTTLE_DELAY = 500;

export function* fetchRepositories() {
  const { token, cancel } = yield call(createReguestCancellation);
  try {
    const params = yield select(getParams);
    const data = yield call(fetchReposAPI, params, token);
    yield put(repositoriesLoadSuccess(data));
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

export function* watchRepositoriesLoadRequest() {
  yield takeLatest(REPOSITORIES_LOAD_REQUEST, fetchRepositories);
}

export function* watchQueryChange() {
  yield throttle(QUERY_CHANGE_THROTTLE_DELAY, SET_QUERY, requestRepositoriesLoad);
}

export function* watchPageChange() {
  yield takeEvery(SET_PAGE, requestRepositoriesLoad);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([watchQueryChange(), watchPageChange(), watchRepositoriesLoadRequest()]);
}
