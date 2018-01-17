'use strict';
const Router = require('koa-router')();

Router.get('/', (ctx, next) => {
    console.log('get')
    ctx.body={code:0,msg:'test'}

})
Router.all('*', (ctx, next) => {
    console.log('*')
    ctx.body = {path:this.path};
});
module.exports=Router;