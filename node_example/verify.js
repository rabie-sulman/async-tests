'use strict';
const jwt = require('jwt-simple');

let data = require(__dirname + '/../data/node/result.json');
let secret = require(__dirname + '/../data/key.json').key;

async function checkKeys(data, callback) {
    await Promise.all(data.map(async item => {
      let data = processItem(item.itemReference.reference);
      return data;
    })).then(callback);
}

function processItem(item) {
  
  let decoded = jwt.decode(item, secret);
  return decoded;
}

// console.log(data);
checkKeys(data, function (result){
    console.log('all ok');
});