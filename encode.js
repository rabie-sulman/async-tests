'use strict';
const fs = require('fs');
const jwt = require('jwt-simple');
var privateKEY  = fs.readFileSync('./private.key', 'utf8');
var publicKEY  = fs.readFileSync('./public.key', 'utf8');

let data = require('./data.json');

async function signKeys(data, callback) {
    await Promise.all(data.map(async item => {
      item.itemReference.reference = processItem(item.itemReference.reference);
      return item;
    })).then(callback);
}

function processItem(item) {
  let secret = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = jwt.encode(item, secret);
  return token;
}

// console.log(data);
signKeys(data, function (result){
  const fs = require('fs');

  fs.writeFile("result.json",JSON.stringify(result), function(err) {

    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 

});