import express, { Application } from 'express'
import {botStart} from './bot';
const app: Application = express();
require('dotenv').config()
const port = 3001;
app.listen(port,async () => {
    botStart();
    console.log(`Listening on ${port}`)
});
process.on('SIGINT', () => {

    console.log('do SIGINT');

    process.exit();

});
