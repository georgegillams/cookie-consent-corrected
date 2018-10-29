const LOAD = 'redux-example/blogs/LOAD';
const LOAD_SUCCESS = 'redux-example/blogs/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/blogs/LOAD_FAIL';
const SINGLE_LOAD = 'redux-example/blogs/SINGLE_LOAD';
const SINGLE_LOAD_SUCCESS = 'redux-example/blogs/SINGLE_LOAD_SUCCESS';
const SINGLE_LOAD_FAIL = 'redux-example/blogs/SINGLE_LOAD_FAIL';
const EDIT_START = 'redux-example/blogs/EDIT_START';
const EDIT_STOP = 'redux-example/blogs/EDIT_STOP';
const SAVE = 'redux-example/blogs/SAVE';
const SAVE_SUCCESS = 'redux-example/blogs/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/blogs/SAVE_FAIL';
const DELETE = 'redux-example/blogs/DELETE';
const DELETE_SUCCESS = 'redux-example/blogs/DELETE_SUCCESS';
const DELETE_FAIL = 'redux-example/blogs/DELETE_FAIL';

const initialState = {
  loaded: false,
  editing: {},
  saveError: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error,
      };
    case SINGLE_LOAD:
      return {
        ...state,
        singleLoading: {
          ...state.singleLoading,
          [action.id]: true,
        },
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
        singleData: {
          ...state.singleData,
          [action.id]: null,
        },
        singleError: action.error,
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
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      const data = [...state.data];
      data[action.result.id - 1] = action.result;
      return {
        ...state,
        data: data,
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

export function isLoaded(globalState) {
  return globalState.blogs && globalState.blogs.loaded;
}

export function isSingleLoaded(globalState, id) {
  return (
    globalState.blogs &&
    globalState.blogs.singleLoaded &&
    globalState.blogs.singleLoaded[id]
  );
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/blogs/load'), // params not used, just shown as demonstration
  };
}

export function loadSingle(blogId) {
  return {
    types: [SINGLE_LOAD, SINGLE_LOAD_SUCCESS, SINGLE_LOAD_FAIL],
    id: blogId,
    promise: client => client.get(`/blogs/loadSingle?id=${blogId}`), // params not used, just shown as demonstration
  };
}

export function create(blog) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: 'new_blog',
    promise: client =>
      client.post('/blogs/create', {
        data: blog,
      }),
  };
}

export function save(blog) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: blog.id,
    promise: client =>
      client.post('/blogs/update', {
        data: blog,
      }),
  };
}

export function remove(blog) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    id: blog.id,
    promise: client =>
      client.post('/blogs/remove', {
        data: blog,
      }),
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
