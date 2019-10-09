'use strict';
const fs = require('fs');
const jwt = require('jsonwebtoken');
var privateKEY  = fs.readFileSync('./private.key', 'utf8');
var publicKEY  = fs.readFileSync('./public.key', 'utf8');
var n = 1;
let data = require('./data.json');

async function signKeys(data, callback) {
    const promises = data.map(async item => {
        item.itemReference.reference = processItem(item.itemReference.reference);
    });
    await Promise.all(promises).then(callback);
}

async function processItem(item) {
    //var token = jwt.sign(item, privateKEY,  { algorithm: 'RS256'});
    return new Promise(function(resolve, reject) {
        jwt.sign(item, privateKEY,  { algorithm: 'RS256'}, function(err, token) {
            if (err) {
                reject(err);
            } else {
                return resolve(token);
            }
        });
    })
}

console.log(new Date().toISOString());
signKeys(data, function (result){console.log(JSON.stringify(data, null, 2) + new Date().toISOString())});