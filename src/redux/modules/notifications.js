const LOAD = 'redux-example/notifications/LOAD';
const LOAD_SUCCESS = 'redux-example/notifications/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/notifications/LOAD_FAIL';
const EDIT_START = 'redux-example/notifications/EDIT_START';
const EDIT_STOP = 'redux-example/notifications/EDIT_STOP';
const CREATE = 'redux-example/notifications/CREATE';
const CREATE_SUCCESS = 'redux-example/notifications/CREATE_SUCCESS';
const CREATE_FAIL = 'redux-example/notifications/CREATE_FAIL';
const SAVE = 'redux-example/notifications/SAVE';
const SAVE_SUCCESS = 'redux-example/notifications/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/notifications/SAVE_FAIL';
const DELETE = 'redux-example/notifications/DELETE';
const DELETE_SUCCESS = 'redux-example/notifications/DELETE_SUCCESS';
const DELETE_FAIL = 'redux-example/notifications/DELETE_FAIL';

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
    case CREATE:
      return state; // 'saving' flag handled by redux-form
    case CREATE_SUCCESS:
      return {
        ...state,
        latestCreated: action.result,
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
  return globalState.notifications && globalState.notifications.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/notifications/load'), // params not used, just shown as demonstration
  };
}

export function save(notification) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: notification.id,
    promise: client =>
      client.post('/notifications/update', {
        data: notification,
      }),
  };
}

export function create(notification) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    id: 'NEW_NOTIFICATION',
    promise: client =>
      client.post('/notifications/create', {
        data: notification,
      }),
  };
}

export function remove(notification) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    id: notification.id,
    promise: client =>
      client.post('/notifications/remove', {
        params: { 'Content-Type': 'application/json' },
        data: notification,
      }),
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
