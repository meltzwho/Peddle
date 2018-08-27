const Nightmare = require('nightmare');
const seller = require('./sellerProfiles');

const nightmare = Nightmare({
  show: true, 
  openDevTools: true
});

let fauxState = {
  allowPickup: false,
  allowShipping: true,
  categoriesFetching: false,
  cityAddress: '',
  defaultAddress: true,
  listingEdit: false,
  listingId: null,
  listingProcessing: false,
  listingSuccessful: null,
  productCondition: '',
  productDescription: '',
  productName: '',
  productPrice: 0, // string rep of price '1000'
  productQuantity: 1,
  selectedCategory: 'Please select', // from 'categories'
  selectedCategoryId: null, // int ??????????
  stateAddress: '',
  streetAddress: '',
  zipCodeAddress: ''
};


nightmare
  // goto signup  
  //.goto('http://google.com/images')
  .goto('http://localhost:3000')
  .wait(20000)
  
  .type('#signup-firstName', `${seller[0].firstName}`)
  .type('#signup-lastName', `${seller[0].lastName}`)
  // .type('#signup-email', `${seller[0].email}`)
  // .type('#signup-password', `${seller[0].password}`)
  // .click('#signup-submit')
  .end()
  .then(console.log('ended'))
  .catch(error => {
    console.error('Search failed:', error);
  });

 