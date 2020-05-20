import { ADD_TODO, LOAD_GIT_INFO_SUCCESS } from './constants';

const todo = (state = {
  todos: [],
  gitData: {},
}, action) => {
  switch (action.type) {
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            id: action.id,
            text: action.text,
            completed: false,
          },
        ],
      });
    case LOAD_GIT_INFO_SUCCESS:
      return Object.assign({}, state, { gitData: action.data });
    default:
      return state;
  }
};

export default todo;
