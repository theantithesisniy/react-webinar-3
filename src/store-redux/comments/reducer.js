const initialState = {
  items: [],
  waiting: false,
  error: null,
};

function commentReducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, waiting: true };

    case 'comments/load-success':
      return { ...state, items: action.payload.data, waiting: false };

    case 'comments/load-error':
      return { ...state, error: action.error, waiting: false };

    case 'comments/add-success':
      return { ...state, items: [...state.items, action.payload.data] };

    case 'comments/add-error':
      return { ...state, error: action.error };

    default:
      return state;
  }
}

export default commentReducer;