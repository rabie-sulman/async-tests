'use strict';
const fs = require('fs');
const jwt = require('jsonwebtoken');
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
    var token = jwt.sign(item, privateKEY,  { algorithm: 'RS256'});
    return token;
}

// console.log(data);
signKeys(data, function (result){console.log(JSON.stringify(result, null, 2))});