const LOAD = 'redux-example/comments/LOAD';
const LOAD_SUCCESS = 'redux-example/comments/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/comments/LOAD_FAIL';
const SINGLE_LOAD = 'redux-example/comments/SINGLE_LOAD';
const SINGLE_LOAD_SUCCESS = 'redux-example/comments/SINGLE_LOAD_SUCCESS';
const SINGLE_LOAD_FAIL = 'redux-example/comments/SINGLE_LOAD_FAIL';
const EDIT_START = 'redux-example/comments/EDIT_START';
const EDIT_STOP = 'redux-example/comments/EDIT_STOP';
const CREATE = 'redux-example/comments/CREATE';
const CREATE_SUCCESS = 'redux-example/comments/CREATE_SUCCESS';
const CREATE_FAIL = 'redux-example/comments/CREATE_FAIL';
const SAVE = 'redux-example/comments/SAVE';
const SAVE_SUCCESS = 'redux-example/comments/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/comments/SAVE_FAIL';
const DELETE = 'redux-example/comments/DELETE';
const DELETE_SUCCESS = 'redux-example/comments/DELETE_SUCCESS';
const DELETE_FAIL = 'redux-example/comments/DELETE_FAIL';

const initialState = {
  loaded: false,
  editing: {},
  creating: {},
  deleting: {},
  saveError: {},
  deletionError: {},
  createError: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SINGLE_LOAD:
      return {
        ...state,
        singleLoading: true,
      };
    case SINGLE_LOAD_SUCCESS:
      return {
        ...state,
        singleLoading: false,
        singleLoaded: true,
        singleData: {
          ...state.singleData,
          [action.id]: action.result,
        },
        singleError: null,
      };
    case SINGLE_LOAD_FAIL:
      return {
        ...state,
        singleLoading: false,
        singleLoaded: false,
        singleData: null,
        singleError: action.error,
      };
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: {
          ...state.loaded,
          [action.id]: true,
        },
        data: {
          ...state.data,
          [action.id]: action.result,
        },
        error: null,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: {
          ...state.loaded,
          [action.id]: false,
        },
        data: {
          ...state.data,
          [action.id]: null,
        },
        error: action.error,
      };
    case EDIT_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true,
        },
      };
    case EDIT_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false,
        },
      };
    case CREATE:
      return state; // 'saving' flag handled by redux-form
    case CREATE_SUCCESS:
      return {
        ...state,
        creating: {
          ...state.editing,
          [action.id]: false,
        },
      };
    case CREATE_FAIL:
      return typeof action.error === 'string'
        ? {
            ...state,
            createError: {
              ...state.createError,
              [action.id]: action.error,
            },
          }
        : state;
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false,
        },
        saveError: {
          ...state.saveError,
          [action.id]: null,
        },
      };
    case SAVE_FAIL:
      return typeof action.error === 'string'
        ? {
            ...state,
            saveError: {
              ...state.saveError,
              [action.id]: action.error,
            },
          }
        : state;
    case DELETE:
      return state; // 'saving' flag handled by redux-form
    case DELETE_SUCCESS:
      return {
        ...state,
        deleting: {
          ...state.deleting,
          [action.id]: false,
        },
        deletionError: {
          ...state.deletionError,
          [action.id]: null,
        },
      };
    case DELETE_FAIL:
      return typeof action.error === 'string'
        ? {
            ...state,
            deletionError: {
              ...state.deletionError,
              [action.id]: action.error,
            },
          }
        : state;
    default:
      return state;
  }
}

export function isLoaded(globalState, id) {
  return (
    globalState.comments &&
    globalState.comments.loaded &&
    globalState.comments.loaded[id]
  );
}

export function isSingleLoaded(globalState) {
  return globalState.comments && globalState.comments.singleLoaded;
}

export function load(pageId) {
  const params = pageId ? `?pageId=${pageId}` : ``;
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    id: pageId || 'ALL',
    promise: client => client.get(`/comments/load${params}`),
  };
}

export function loadSingle(commentId) {
  const params = commentId ? `?id=${commentId}` : ``;
  return {
    types: [SINGLE_LOAD, SINGLE_LOAD_SUCCESS, SINGLE_LOAD_FAIL],
    promise: client => client.get(`/comments/loadSingle${params}`),
  };
}

export function create(comment) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    id: 'newComment',
    promise: client =>
      client.post('/comments/create', {
        params: { 'Content-Type': 'application/json' },
        data: comment,
      }),
  };
}

export function save(comment) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: comment.id,
    promise: client =>
      client.post('/comments/update', {
        params: { 'Content-Type': 'application/json' },
        data: comment,
      }),
  };
}

export function remove(comment) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    id: comment.id,
    promise: client =>
      client.post('/comments/remove', {
        params: { 'Content-Type': 'application/json' },
        data: comment,
      }),
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
