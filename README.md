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

let option = {
origin: 'wwww.baidu.com',
erroDomain:function (ctx, next) {
ctx.body={code:2,msg:"非法域名"};
    return;
}
}

app.use(option);
router.get('/', function() {
  this.body = { msg: 'Hello World!' };
});
app.use(router.routes());
app.listen(3000);
```


eg4
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


## Options

### origin

Configures the **Access-Control-Allow-Origin** CORS header. Expects a string
(ex: http://example.com). Set to `true` to reflect the
[request origin](http://tools.ietf.org/html/draft-abarth-origin-09), as defined
by `req.header('Origin')`. Set to `false` to disable CORS. Can also be set to a
function, which takes the request as the first parameter.

### expose

Configures the **Access-Control-Expose-Headers** CORS header. Expects a
comma-delimited string (ex: 'WWW-Authenticate,Server-Authorization') or an array
(ex: `['WWW-Authenticate', 'Server-Authorization']`). Set this to pass the
header, otherwise it is omitted.

### maxAge

Configures the **Access-Control-Max-Age** CORS header. Set to an integer to pass
the header, otherwise it is omitted.

### credentials

Configures the **Access-Control-Allow-Credentials** CORS header. Set to `true`
to pass the header, otherwise it is omitted.

### methods

Configures the **Access-Control-Allow-Methods** CORS header. Expects a
comma-delimited string (ex: 'GET,PUT,POST') or an array (ex: `['GET', 'PUT',
'POST']`).

### headers
Configures the **Access-Control-Allow-Headers** CORS header. Expects a
comma-delimited string (ex: 'Content-Type,Authorization') or an array (ex:
`['Content-Type', 'Authorization']`). If not specified, defaults to reflecting
the headers specified in the request's **Access-Control-Request-Headers**
header.
### erroDomain

Configures erro domain tips

Expects a function(ctx, next) see eg4