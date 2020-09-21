'use strict';
var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));
app.get('/*', (req, res) => { res.sendFile(__dirname+'/index.html') })

app.set('port', 3000);

var server = app.listen(app.get('port'), function () {
    console.log('listening');
});
