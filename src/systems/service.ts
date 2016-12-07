import * as koa from 'koa'


const Webpack = require('webpack')
const webpackMiddleware = require('koa-webpack')
const Body = require('koa-body')
const Socket = require('koa-socket')
const Logger = require('koa-logger')
const Route = require('koa-route')
const rewrite = require('koa-rewrite')

const config = require('../web/webpack.config')

const app = new koa()
app.use(Logger())

;
['explorer', 'portfolio'].forEach((name: string) => {
    app.use(rewrite('/' + name, '/'))
})

const compiler = new Webpack(config)
const webpack = webpackMiddleware({
  compiler,
  dev: {
      hot: true,
      inline: true
  }
})
app.use(webpack)

const socket = new Socket()
socket.attach(app)

app.use(new Body())

socket.on('connection', (ctx: Object) => {
  console.log('client connected')
})

export default {
  app,
  compiler,
  io: app['io'],
  socket: app['_io']
}