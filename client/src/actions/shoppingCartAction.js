// export const fetchListingsStart = () => ({type: 'FETCH_LISTINGS_START'});

const updateViewWidth = (isDesktop) => (
  {
    type: 'TOGGLE_IS_DESKTOP',
    payload: {
      isDesktop: isDesktop
    }
  }
);

export default updateViewWidth;
// export const fetchListingsFail = () => ({type: 'FETCH_LISTINGS_FAIL'});

// export const closeModal = () => ({type: 'CLOSE_MODAL'});