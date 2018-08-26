const Nightmare = require('nightmare');
const seller = require('./sellerProfiles');

const nightmare = Nightmare({ show: true, openDevTools: true });

console.log(seller);
nightmare
  // goto signup  
  //.goto('http://google.com')
  .wait(6000)
  .goto('http://localhost:3000')
  .wait(120000)
  // .type('.signup-firstName', `${seller[0].firstName}`)
  // .type('#signup-lastName', `${seller[0].lastName}`)
  // .type('#signup-email', `${seller[0].email}`)
  // .type('#signup-password', `${seller[0].password}`)
  // .click('#signup-submit')
  .end()
  .then(console.log('ended'))
  .catch(error => {
    console.error('Search failed:', error);
  });