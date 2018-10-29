const LOAD = 'redux-example/payments/LOAD';
const LOAD_SUCCESS = 'redux-example/payments/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/payments/LOAD_FAIL';
const SINGLE_LOAD = 'redux-example/payments/SINGLE_LOAD';
const SINGLE_LOAD_SUCCESS = 'redux-example/payments/SINGLE_LOAD_SUCCESS';
const SINGLE_LOAD_FAIL = 'redux-example/payments/SINGLE_LOAD_FAIL';
const EDIT_START = 'redux-example/payments/EDIT_START';
const EDIT_STOP = 'redux-example/payments/EDIT_STOP';
const CREATE = 'redux-example/payments/CREATE';
const CREATE_SUCCESS = 'redux-example/payments/CREATE_SUCCESS';
const CREATE_FAIL = 'redux-example/payments/CREATE_FAIL';
const SAVE = 'redux-example/payments/SAVE';
const SAVE_SUCCESS = 'redux-example/payments/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/payments/SAVE_FAIL';
const DELETE = 'redux-example/payments/DELETE';
const DELETE_SUCCESS = 'redux-example/payments/DELETE_SUCCESS';
const DELETE_FAIL = 'redux-example/payments/DELETE_FAIL';

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
        singleData: action.result,
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

export function isLoaded(globalState) {
  return globalState.payments && globalState.payments.loaded;
}

export function isSingleLoaded(globalState) {
  return globalState.payments && globalState.payments.singleLoaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get(`/payments/load`),
  };
}

export function loadSingle(paymentId) {
  const params = paymentId ? `?id=${paymentId}` : ``;
  return {
    types: [SINGLE_LOAD, SINGLE_LOAD_SUCCESS, SINGLE_LOAD_FAIL],
    promise: client => client.get(`/payments/loadSingle${params}`),
  };
}

export function create(payment) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    id: 'newPayment',
    promise: client =>
      client.post('/payments/create', {
        params: { 'Content-Type': 'application/json' },
        data: payment,
      }),
  };
}

export function save(payment) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: payment.id,
    promise: client =>
      client.post('/payments/update', {
        params: { 'Content-Type': 'application/json' },
        data: payment,
      }),
  };
}

export function remove(payment) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    id: payment.id,
    promise: client =>
      client.post('/payments/remove', {
        params: { 'Content-Type': 'application/json' },
        data: payment,
      }),
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
