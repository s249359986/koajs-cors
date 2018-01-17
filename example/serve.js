'use strict';
var body = require('koa-better-body');
var cors=require('../lib/index.js');
var onError=require('koajs-error');
var router = require('./router.js');
var koa = require('koa');
var app = module.exports =new koa();
const convert = require('koa-convert')

let corsOption = {origin:true};
corsOption.origin=function (origin) {
    var tempOrigin=origin.headers.origin;
    var tempWhiteList=[];
    console.log("origin:"+tempOrigin)
    for(var i=0;i<tempWhiteList.length;i++)
    {
        if(tempOrigin==undefined)
        {
            return "*";
        }
        if(tool.isOriginAllowed(tempOrigin,CONFIG.allowOrigin))
        {
            return tempOrigin;
        }
        if(tempOrigin&&tempWhiteList[i].indexOf(tempOrigin)>-1)// 注意顺序
        {
            console.log("allowOrigin:"+tempOrigin)
            return tempOrigin;
        }
    }
    return false;
}
corsOption.erroDomain=function (ctx, next) {
    ctx.body={code:2,msg:"非法域名"};
    return;
}

/*
* 异常捕获
*
* */
app.use(convert(onError({type:"json"})));
/*
 * 跨域访问设置
 *
 * */
app.use(cors(corsOption));
app.use(convert(body({formLimit:"10mb",textLimit:"10mb",jsonLimit:"10mb"})));




/*
* 路由
* */
app.use(convert(router.routes())).use(convert(router.allowedMethods()));
console.log('appStart:8086');

app.listen(8086);

