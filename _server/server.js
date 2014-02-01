"use strict";

var express = require('express'),
    jade = require('jade'),
    fs = require('fs');

var app = express();

app.use(express.static('./static'));
app.use(express.compress());

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function(req, res){
    res.render('index', {
        title       : "Webcam title",
        allowCamera : "Please allow this page to access your camera.",
        notSupported: "Your browser does not support the Camera API."
    });
});

app.listen(process.env.PORT || 3000);
module.exports = app;
