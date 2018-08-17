export const fetchProgressStart = () => {
  return {
    type: 'PROGRESS_BAR_START'
  };
};

export const fetchProgressComplete = (progress) => ({
  type: 'PROGRESS_BAR_COMPLETE',
  payload: {
    progress: progress
  }
});