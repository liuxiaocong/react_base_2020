/* eslint-disable no-plusplus,no-unused-vars */
import axios from 'axios';
import { ADD_TODO, LOAD_GIT_INFO, LOAD_GIT_INFO_FAIL, LOAD_GIT_INFO_SUCCESS } from './constants';

let nextTodoId = 0;

const addTodo = (text) => ({
  type: ADD_TODO,
  id: nextTodoId++,
  text,
});

const loadGitInfo = () =>(
  {
    type: LOAD_GIT_INFO,
  }
)

const loadGitInfoSuccess = (data) =>(
  {
    type: LOAD_GIT_INFO_SUCCESS,
    data,
  }
)

const loadGitInfoFail = () =>(
  {
    type: LOAD_GIT_INFO_FAIL,
  }
)

const getGitInfo = () => (dispatch) => {
  axios.get('https://api.github.com/users/liuxiaocong').then((res) => {
    const data = res.data;
    dispatch(loadGitInfoSuccess(data));
  });
};

export default {
  addTodo,
  loadGitInfo,
  getGitInfo,
  loadGitInfoSuccess,
  loadGitInfoFail
};
