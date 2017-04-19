const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const path = require('path')

var mongojs = require('mongojs')

// Request Handlers
var Index = require('./routes/index')
var Articles = require('./routes/articles')
var Coauthors = require('./routes/coauthors')

const app = express()

// View Engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')))

// Body Parser Middle Ware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

var config = require('./config')
var dbConfig = config.client.mongodb
var db = mongojs(dbConfig.defaultUri + dbConfig.defaultDatabase, ['articles', 'coauthors'])

app.listen(config.expressPort, () => {
  console.log('listening on '+ config.expressPort)
})

var EJSRenderer = require('./routes/lib/ejs-renderer')
var JSONRenderer = require('./routes/lib/json-renderer')

// Routes
app.get('/', function(req, res, next){
  var ejsRenderer = new EJSRenderer(res, 'index.ejs')
  var jsonRenderer = new JSONRenderer(res)
  var handler = new Index(db, ejsRenderer, jsonRenderer)
  handler.handleRequest()
});

app.get('/api/articles', function(req, res, next){
  var jsonRenderer = new JSONRenderer(res)
  var handler = new Articles(db, jsonRenderer, jsonRenderer)
  handler.handleRequest()
})

app.get('/api/articles/:id', function(req, res, next){
  var jsonRenderer = new JSONRenderer(res)
  var handler = new Articles(db, jsonRenderer, jsonRenderer)
  var articleId = mongojs.ObjectId(req.params.id)
  handler.handleRequest({articleId: articleId})
})


app.get('/api/coauthors/matrix', function(req, res, next){
  var ejsRenderer = new EJSRenderer(res, 'show-matrix.ejs')
  var jsonRenderer = new JSONRenderer(res)
  var handler = new Coauthors(db, ejsRenderer, jsonRenderer)
  handler.handleRequest()
})

app.get('/api/coauthors/json', function(req, res, next){
  var jsonRenderer = new JSONRenderer(res)
  var handler = new Coauthors(db, jsonRenderer, jsonRenderer)
  handler.handleRequest()
})