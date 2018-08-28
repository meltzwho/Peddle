// import Nightmare from 'nightmare';
const nightmare = Nightmare({ show: true });
const fs = require('fs');

// pattern for image search https://www.google.com/search?q=appliances&tbm=shop

// this is what is being sent to aws as the req.files
// { file: 
//   { name: 'pubg.jpg',
//     data: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 84 00 09 06 07 12 12 12 15 13 12 13 15 16 15 15 18 19 17 17 18 17 18 18 17 17 1a ... >,
//     encoding: '7bit',
//     truncated: false,
//     mimetype: 'image/jpeg',
//     md5: '15b3fc5e9e456463d8b6b1e0f0c7d894',
//     mv: [Function: mv] } 
// }


let retrieveImage = () => {
  
  nightmare
    .goto('https://google.com/search?q=toaster&tbm=shop')
    .wait(2000)
    .evaluate( () => {
      let img = document.querySelector('.rg_ic');
      return img.getAttribute('src');
      
    })
    .end()
    .then( (result) => {
      console.log('attr: ', result);
      // fs.writeFileSync(
      //   '../img/first.jpg'
      //   , result
      //   , err => console.log('Write File Error:', err)
      // )
    })
    .catch( err => console.error('Failed Search: ', err))
};

module.exports = retrieveImage;