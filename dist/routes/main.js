"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const https_1 = require("https");
const requestPage = require('request');
exports._router = express_1.Router();
exports._router.use((req, res, next) => {
    console.log('Current Time --> ', Date.now());
    next();
});
exports._router.get('/', function (req, res) {
    res.send(' home page');
});
exports._router.get('/about', function (req, res) {
    res.send(' About ');
});
exports._router.get('/about/:from-:to', function (req, res) {
    const { from, to } = req.params;
    res.send(`Get Data from ${from} - ${to}`);
});
exports._router.get('/I/want/title/', function (req, res) {
    const querying = req.query;
    if (!isEmpty(querying)) {
        if (querying['address'] !== undefined) {
            console.log('===>', querying['address'], typeof querying['address']);
            if (querying['address'].length > 0 && typeof querying['address'] === 'object') {
                console.log(querying['address']);
                querying['address'].forEach((element) => {
                    console.log(element);
                    https_1.request(element, resData => {
                        console.log(resData);
                    });
                });
            }
            else {
                if (querying['address'].length > 0 && typeof querying['address'] === 'string') {
                    const regEx = new RegExp(/^http:\/\/|https:\/\//);
                    if (regEx.test(querying['address'])) {
                        console.log('Http Included');
                        res.send({ status: 'valid URLLL' });
                    }
                    else {
                        console.log('Http NOT Included');
                        res.send({ error: 'Invalid URL' });
                    }
                }
                else {
                    console.log('No Query Params Data');
                }
            }
        }
    }
    else {
        console.log('No Query Params');
    }
});
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
}
