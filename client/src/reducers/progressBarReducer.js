const defaultState = {
  fetchingProgress: false,
  active: true,
  sold: false,
  shipped: false,
  completed: false
};

const ProgressBarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'PROGRESS_BAR_START':
      return Object.assign({}, state, {fetchingProgress: true});
    case 'PROGRESS_BAR_COMPLETE':
      return Object.assign({}, state, {
        sold: action.payload.progress.sold > 0 ? true : false, 
        shipped: action.payload.progress.shipped > 0 ? true : false,
        completed: action.payload.progress.completed > 0 ? true : false
      });
    default: 
      return state;
  }
};

export default ProgressBarReducer;