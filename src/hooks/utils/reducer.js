

const initialState = {
  isLoading: false,
  data: undefined,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'DATA_LOADING':
      return {
        ...state,
        isLoading: true,
        error: null,
        data: action.payload.data,
      };
    case 'DATA_UPDATE':
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload.data,
      };
    case 'DATA_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      throw new Error('Unhandled ACTION');
  }
}
