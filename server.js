// 'use strict';
/*
https://carmenchapa-fcc-timestamp.glitch.me/December%2015,%202015
https://carmenchapa-fcc-timestamp.glitch.me/1450137600
*/


var fs = require('fs');
var express = require('express');
var app = express();
// const port = (process.env.PORT || '3000');

app.get('/:date', function(req, res){

  var unix = null
  var natural = null
  var date
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  var input = req.params.date
  var arr = input.split(' ')
  
  if(arr.length==1 && input.match(/^[0-9]{10}$/)){
      var miliseconds = input + '000'
      date = new Date(parseInt(miliseconds))
  }
  if(arr.length==3){
    date = new Date(input)
  }
  
  if(date){
    unix = date.getTime()
    if(unix != null){
      natural = months[date.getMonth()] + ' ' +  date.getDate() + ', ' + date.getFullYear()
    }
  }

  var obj = {unix, natural}
  res.json(obj);
})






//////


if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}

app.use('/public', express.static(process.cwd() + '/public'));

app.route('/_api/package.json')
  .get(function(req, res, next) {
    console.log('requested');
    fs.readFile(__dirname + '/package.json', function(err, data) {
      if(err) return next(err);
      res.type('txt').send(data.toString());
    });
  });
  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

