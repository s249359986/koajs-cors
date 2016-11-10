# koajs-cors

## koajs-cors
- CORS middleware for Koa

## Installation
$npm install koajs-cors

## Usage

eg1
```
var koa = require('koa');
var router = require('koa-router');
var cors = require('koajs-cors');
var app = new koa();

app.use(cors({
  origin: ["http://domain:port","http://domain:port"]
}));
router.get('/', function() {
  this.body = { msg: 'Hello World!' };
});
app.use(router.routes());

app.listen(3000);
```
eg2

```
var koa = require('koa');
var router = require('koa-router');
var cors = require('koajs-cors');
var app = new koa();

app.use(cors({
  origin: "http://domain:port"
}));
router.get('/', function() {
  this.body = { msg: 'Hello World!' };
});
app.use(router.routes());
app.listen(3000);
```
eg3
```
var koa = require('koa');
var router = require('koa-router');
var cors = require('koajs-cors');
var app = new koa();

app.use(cors({
  origin: true
}));
router.get('/', function() {
  this.body = { msg: 'Hello World!' };
});
app.use(router.routes());
app.listen(3000);
```

