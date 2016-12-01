var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var compression = require('compression');
var timeout = require('connect-timeout');

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next();
}

express()
  // timeout
  .use('/timeout', timeout(1000))
  .use('/timeout', function(req, res, next) {
    setTimeout(function() {
      next()
    }, 2000);
  })
  .use(haltOnTimedout)
  .use('/timeout', function(req, res, next) {
    console.log('Done');
    res.end('Done');
  })

  // session
  .use('/session', cookieSession({
    keys: ['my super secret sign key']
  }))
  .use('/session/home', function(req, res) {
    if (req.session.views) {
      req.session.views++;
    } else {
      req.session.views = 1;
    }
    res.end('Total views for you: ' + req.session.views);
  })
  .use('/session/reset', function(req, res) {
    delete req.session.views;
    res.end('Cleared all your views');
  })

  // signed cookies
  .use('/signed-cookies', cookieParser('my super secret sign key'))
  .use('/signed-cookies/toggle', function(req, res) {
    if (req.signedCookies.name) {
      res.clearCookie('name');
      res.end('name cookie cleared! Was: ' + req.signedCookies.name);
    } else {
      res.cookie(
        'name',
        'foo',
        {
          signed: true,
          httpOnly: true,
          //secure: true,
        }
      );
      res.end('name cookie set!');
    }
  })

  // cookies
  .use('/cookies', cookieParser())
  .use('/cookies/toggle', function(req, res) {
    if (req.cookies.name) {
      res.clearCookie('name');
      res.end('name cookie cleared! Was: ' + req.cookies.name);
    } else {
      res.cookie('name', 'foo');
      res.end('name cookie set!');
    }
  })

  // json
  .use('/api/v1', bodyParser.json())
  .use('/api/v1', bodyParser.urlencoded({
    extended: true,
  }))
  .use('/api/v1', function(req, res) {
    if (req.body.foo) {
      res.end('Body parsed! Value of foo: ' + req.body.foo);
    } else {
      res.end('Body does not have foo!');
    }
  })
  .use('/api/v1', function(err, req, res, next) {
    res.end('Invalid body!');
  })
  
  // compression
  .use(compression())

  // static
  .use(express.static(__dirname + '/public'))
  .use(function(req, res, next) {
    res.end('hi express');
  })

  .listen(3000);
