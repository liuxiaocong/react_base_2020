/* eslint-disable no-unused-vars */
import { put, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';
import { LOAD_GIT_INFO } from './constants';
import todoAction from './actions';

export function* loadGitInfoWatch() {
  yield takeEvery(LOAD_GIT_INFO, loadGitInfo);
}

export function* loadGitInfo() {
  const res = yield axios.get('https://api.github.com/users/liuxiaocong');
  if (res && res.status === 200) {
    yield put(todoAction.loadGitInfoSuccess(res.data));
  }
}

export default [
  loadGitInfoWatch(),
];
