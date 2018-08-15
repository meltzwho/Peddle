export const uploadImageStart = () => {
  return {
    type: 'IMAGE_UPLOAD_START'
  };
};

export const uploadImageComplete = (url) => {
  console.log('url', url);
  return {
    type: 'IMAGE_UPLOAD_COMPLETE',
    url: url
  };
};