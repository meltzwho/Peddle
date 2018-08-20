export const fetchListingsStart = () => ({type: 'FETCH_LISTINGS_START'});

export const fetchListingsSuccess = (listings) => (
  {
    type: 'FETCH_LISTINGS_SUCCESS',
    payload: {
      listings: listings
    }
  }
);


export const fetchListingsFail = () => ({type: 'FETCH_LISTINGS_FAIL'});

export const closeModal = () => ({type: 'CLOSE_MODAL'});