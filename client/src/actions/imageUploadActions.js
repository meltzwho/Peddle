export const uploadImageStart = () => {
  return {
    type: 'IMAGE_UPLOAD_START'
  };
};

export const uploadImageComplete = (url) => (
  {
    type: 'IMAGE_UPLOAD_COMPLETE',
    payload: {
      url: url
    }
  }
);

export const clearUrls = () => ({type: 'CLEAR_URLS'});