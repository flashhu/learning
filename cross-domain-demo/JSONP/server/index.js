const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
  const { callback, msg } = ctx.query;
  ctx.body = `${callback}(${JSON.stringify({ msg })})`;
});

app.listen(8080);