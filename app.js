const express = require('express');
const path = require('path');
// const favicon = require('favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const mongodb = require('./modules/mongodb');
const index = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

if(process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
}
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDBへ接続
// mongodb.init();

// ルーターを登録
app.use('/', index);

module.exports = app;
