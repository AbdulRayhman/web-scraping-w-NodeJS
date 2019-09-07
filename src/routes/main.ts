import { Response, Request, Router } from 'express';
import { load } from 'cheerio';
import { isEmpty } from '../utils/helper';
const requestPage = require('request');
export const _router = Router();
_router.use((req, res, next) => {
	next();
});
_router.get('/', function(req, res) {
	res.send(' home page');
});

_router.get('/I/want/title/', function(req: Request, res: Response) {
	const querying = req.query;
	if (!isEmpty(querying)) {
		if (querying['address'] !== undefined) {
			if (querying['address'].length > 0 && typeof querying['address'] === 'object') {
				const arr: any = [];
				const promiseArr: any = [];
				querying['address'].forEach((element: any) => {
					const promise = new Promise((resolve, reject) => {
						const regEx = new RegExp(/^http:\/\/|https:\/\//);
						if (regEx.test(element)) {
							const reqPageRes = requestPage(element, function(
								error: any,
								response: any,
								body: any,
							) {
								if (body !== undefined) {
									resolve(load(body)('title').text());
								} else if (error) {
									resolve('No Response');
								} else {
									reject('Response Not Get');
								}
							});
						} else {
							res.send({ error: 'Invalid URL' });
						}
					});
					promise
						.then(
							data => {
								if (data) {
									arr.push({ title: `${data}` });
								}
							},
							err => {
								arr.push({ title: `${err}` });
							},
						)
						.catch(err => {
							arr.push({ title: `No Response` });
						});
					promiseArr.push(promise);
				});
				Promise.all(promiseArr)
					.then(value => {
						console.log('===>', value);
						res.send(value);
					})
					.catch(err => {
						// console.log(err);
						res.send(err);
					});
				// res.send(resSendObj);
			} else {
				if (querying['address'].length > 0 && typeof querying['address'] === 'string') {
					const regEx = new RegExp(/^http:\/\/|https:\/\//);
					if (regEx.test(querying['address'])) {
						requestPage(querying['address'], function({}, {}, body: any) {
							res.send({ title: `${load(body)('title').text()}` });
						});
					} else {
						res.send({ error: 'Invalid URL' });
					}
				} else {
					console.log('No Query Params Data');
				}
			}
		}
	} else {
		console.log('No Query Params');
	}
});
