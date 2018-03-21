const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const compression = require('koa-compress');
const convert = require('koa-convert');
const respond = require('koa-respond');
const glob = require('glob');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('koa-morgan');
const unless = require('koa-unless');
require('dotenv').config({ path: `${__dirname}/config/environments/${process.env.NODE_ENV}.env` });
require('./server/config/globalConstant');

mongoose.connect(MONGO_URL);
mongoose.connection.on('connected', function () {
  console.log(`Connected to MongoDB`);
  mongoose.set('debug', true);
});
mongoose.connection.on('error', function (err) {
  console.log(`Mongoose connection error: ${err.message}`);
});

glob.sync('./server/**/*Model.js' ).forEach( function( file ) {
  require(path.resolve( file ));
});

const customMiddleware = require('./server/utils/customMiddleware');

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(`ERROR ::: Something went wrong, error: ${err.message}, stack: ${err.stack}`);
    ctx.status = err.status || 500;
    ctx.body = {message: err.message};
    ctx.app.emit('error', err, ctx);
  }
});
// read POST requests and cookies
app.use(bodyParser());

// use common features to make uploads and downloads smaller
app.use(compression());

app.use(respond());

app.use(morgan('dev'))

// Add auth middleware with unless
customMiddleware.authenticate.unless = unless
app.use(customMiddleware.authenticate.unless({ path: [/^\/public/] }));

// // support different functions for different pages on the server
// app.use(router.routes())
//   .use(router.allowedMethods());

glob.sync('./server/**/*Route.js').forEach(function (file) {
  Object.values(require(path.resolve(file))).forEach(router => app.use(router.routes(), router.allowedMethods()))
});



module.exports = app