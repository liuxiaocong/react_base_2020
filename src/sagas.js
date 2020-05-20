import { all } from 'redux-saga/effects';
import todoSaga from './data/todo/saga';

export default function* rootSaga() {
  yield all([
    ...todoSaga,
  ],);
}
