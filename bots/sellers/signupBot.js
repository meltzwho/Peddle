const Nightmare = require('nightmare');
const seller = require('./sellerProfiles');

const nightmare = Nightmare({
  show: true, 
  openDevTools: true
});


nightmare
  // goto signup  
  //.goto('http://google.com')
  .goto('http://localhost:3000')
  
  
  .type('.signup-firstName', `${seller[0].firstName}`)
  .type('#signup-lastName', `${seller[0].lastName}`)
  // .type('#signup-email', `${seller[0].email}`)
  // .type('#signup-password', `${seller[0].password}`)
  // .click('#signup-submit')
  .end()
  .then(console.log('ended'))
  .catch(error => {
    console.error('Search failed:', error);
  });

 