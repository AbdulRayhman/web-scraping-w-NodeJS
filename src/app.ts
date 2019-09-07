import express, { Application } from 'express';
import { _router } from './routes/main';
export const app: Application = express();

import * as bodyParser from 'body-parser';
app.use(bodyParser.text({ type: 'text/html' }));
app.use('/', _router);
app.listen(5000, () => console.log("Hi There, It's me 5000 ;;;;"));
