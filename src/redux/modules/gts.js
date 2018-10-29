const LOAD = 'redux-example/gts/LOAD';
const LOAD_SUCCESS = 'redux-example/gts/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/gts/LOAD_FAIL';
const LATEST_LOAD = 'redux-example/gts/LATEST_LOAD';
const LATEST_LOAD_SUCCESS = 'redux-example/gts/LATEST_LOAD_SUCCESS';
const LATEST_LOAD_FAIL = 'redux-example/gts/LATEST_LOAD_FAIL';
const EDIT_START = 'redux-example/gts/EDIT_START';
const EDIT_STOP = 'redux-example/gts/EDIT_STOP';
const SAVE = 'redux-example/gts/SAVE';
const SAVE_SUCCESS = 'redux-example/gts/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/gts/SAVE_FAIL';
const DELETE = 'redux-example/gts/DELETE';
const DELETE_SUCCESS = 'redux-example/gts/DELETE_SUCCESS';
const DELETE_FAIL = 'redux-example/gts/DELETE_FAIL';

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
        data: null,
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
    case LATEST_LOAD:
      return {
        ...state,
        singleLoading: {
          ...state.singleLoading,
          [action.id]: true,
        },
        latestData: null,
      };
    case LATEST_LOAD_SUCCESS:
      return {
        ...state,
        singleLoading: false,
        latestLoaded: true,
        latestData: action.result,
        singleError: null,
      };
    case LATEST_LOAD_FAIL:
      return {
        ...state,
        singleLoading: false,
        latestLoaded: false,
        latestData: null,
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
  return globalState.gts && globalState.gts.loaded;
}

export function isLatestLoaded(globalState) {
  return globalState.gts && globalState.gts.latestLoaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/gts/load'), // params not used, just shown as demonstration
  };
}

export function loadLatest() {
  return {
    types: [LATEST_LOAD, LATEST_LOAD_SUCCESS, LATEST_LOAD_FAIL],
    id: 'latest',
    promise: client => client.get(`/gts/loadLatest`), // params not used, just shown as demonstration
  };
}

export function create(gts) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: 'new_gts',
    promise: client =>
      client.post('/gts/create', {
        data: gts,
      }),
  };
}

export function save(gts) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: gts.id,
    promise: client =>
      client.post('/gts/update', {
        data: gts,
      }),
  };
}

export function remove(gts) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    id: gts.id,
    promise: client =>
      client.post('/gts/remove', {
        data: gts,
      }),
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
