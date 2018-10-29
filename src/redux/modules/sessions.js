const LOAD = 'redux-example/sessions/LOAD';
const LOAD_SUCCESS = 'redux-example/sessions/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/sessions/LOAD_FAIL';
const KEEP_ALIVE = 'redux-example/sessions/KEEP_ALIVE';
const KEEP_ALIVE_SUCCESS = 'redux-example/sessions/KEEP_ALIVE_SUCCESS';
const KEEP_ALIVE_FAIL = 'redux-example/sessions/KEEP_ALIVE_FAIL';
const CREATE_FAIL = 'redux-example/sessions/CREATE_FAIL';
const CREATE = 'redux-example/sessions/CREATE';
const CREATE_SUCCESS = 'redux-example/sessions/CREATE_SUCCESS';
const EDIT_START = 'redux-example/sessions/EDIT_START';
const EDIT_STOP = 'redux-example/sessions/EDIT_STOP';
const SAVE = 'redux-example/sessions/SAVE';
const SAVE_SUCCESS = 'redux-example/sessions/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/sessions/SAVE_FAIL';
const UPDATE_SERVER_CONTENT_UPDATE_TIMESTAMP =
  'redux-example/sessions/UPDATE_SERVER_CONTENT_UPDATE_TIMESTAMP';
const UPDATE_NEW_DATA_AVAILABLE =
  'redux-example/sessions/UPDATE_NEW_DATA_AVAILABLE';
const EXPOSE_SESSION = 'redux-example/sessions/EXPOSE_SESSION';
const EXPOSE_SESSION_SUCCESS = 'redux-example/sessions/EXPOSE_SESSION_SUCCESS';
const EXPOSE_SESSION_FAIL = 'redux-example/sessions/EXPOSE_SESSION_FAIL';

const initialState = {
  loaded: false,
  editing: {},
  saveError: {},
  contentLastUpdatedTimestamp: 0,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
        creating: true,
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
        session: action.result,
        error: null,
      };
    case CREATE_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
        session: null,
        error: action.error,
      };
    case KEEP_ALIVE:
      return {
        ...state,
        loading: true,
      };
    case KEEP_ALIVE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null,
      };
    case KEEP_ALIVE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error,
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
        loaded: true,
        allSessionData: action.result,
        error: null,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        allSessionData: null,
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
    case UPDATE_SERVER_CONTENT_UPDATE_TIMESTAMP:
      // console.log("action:");
      // console.log(action);

      return {
        ...state,
        serverContentUpdateTimestamp: action.newValue,
      };
    case UPDATE_NEW_DATA_AVAILABLE:
      // console.log("action:");
      // console.log(action);

      return {
        ...state,
        newDataAvailable: action.newValue,
      };
    case EXPOSE_SESSION:
      return {
        ...state,
        session: action.session,
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.session && globalState.session.created;
}

export function isLoadedAll(globalState) {
  return globalState.sessions && globalState.sessions.loaded;
}

export function createSession() {
  // console.log("creating session");
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: client => client.post('/sessions/create'), // params not used, just shown as demonstration
  };
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get(`/sessions/load`),
  };
}

export function updateServerContentUpdateTimestamp(newValue) {
  // console.log(`updatingTimestamp: ${newTimestamp}`);
  return {
    type: UPDATE_SERVER_CONTENT_UPDATE_TIMESTAMP,
    newValue: newValue,
  };
}

export function updateNewDataAvailable(newValue) {
  // console.log(`updatingTimestamp: ${newTimestamp}`);
  return {
    type: UPDATE_NEW_DATA_AVAILABLE,
    newValue: newValue,
  };
}

export function keepAlive(sessionKey) {
  // console.log(`keeping session ${sessionKey} alive`);
  return {
    types: [KEEP_ALIVE, KEEP_ALIVE_SUCCESS, KEEP_ALIVE_FAIL],
    promise: client =>
      client.post('/sessions/keepalive', {
        params: { 'Content-Type': 'application/json' },
        data: { sessionKey: sessionKey },
      }), // params not used, just shown as demonstration
  };
}

export function save(notification) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: notification.id,
    promise: client =>
      client.post('/sessions/update', {
        data: notification,
      }),
  };
}

export function exposeSession(session) {
  return {
    type: EXPOSE_SESSION,
    session: session,
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
