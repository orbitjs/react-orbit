const initialState = {
  data: undefined,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'DATA_UPDATE':
      return {
        ...state,
        error: null,
        data: action.payload.data,
      };
    case 'DATA_ERROR':
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      throw new Error('Unhandled ACTION');
  }
}
