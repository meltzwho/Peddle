import Nightmare from 'nightmare';

const nightmare = Nightmare({ show: true });

nightmare
// goto login and try that
  .goto('localhost:3000/login')
  .type('#login-email', `${seller[i].loginEmail}`)
  .type('#login-password', `${seller[i].loginPassword}`)
  .click('#login-submit')
  // now in stripe
  .wait('#skip-account-app')
  .click('#skip-account-app')
  // now in seller dashboard
  .wait('#dash-new-item')
  .click('#dash-new-item')
  // if success
    // goto sellerDashboard
  // if failure
    // goto signup and signup
    // goto sellerDashboard and click list an item
    // fill out the stripe form
    // start filling out seller list form 