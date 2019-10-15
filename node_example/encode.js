'use strict';
const fs = require('fs');
const jwt = require('jwt-simple');
const secret = require(__dirname + '/../data/key.json').key;

let data = require(__dirname + '/../data/data.json');

async function signKeys(data, callback) {
    await Promise.all(data.map(async item => {
      item.itemReference.reference = processItem(item.itemReference.reference);
      return item;
    })).then(callback);
}

function processItem(item) {
  let token = jwt.encode(item, secret);
  return token;
}

signKeys(data, function (result){
  fs.writeFile(__dirname + "/../data/node/result.json",JSON.stringify(result), function(err) {
      if(err) {return console.log(err);}
    console.log("The file was saved!");
  }); 

});