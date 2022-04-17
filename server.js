const http = require('http')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Post = require('./models/posts')
const { HEADERS, STATUS } = require('./constants')
const { errorHandler } = require('./handlers')
const {
  getAll,
  getOne,
  postOneOrMany,
  deleteAll,
  deleteOne,
  patchOne
} = require('./methods')


// env setup
dotenv.config({path: './config.env'})

const { DATABASE_URL, DATABASE_PASSWORD } = process.env
const DB = DATABASE_URL
  .replace('<password>', DATABASE_PASSWORD)
  .replace('<dbname>', 'hotel')


// connect to database
mongoose.connect(DB)


// server handler
const requestListener = async (req, res) => {
  const { url, method } = req
  let body = ''

  req.on('data', chunk => body += chunk)
  await new Promise(resolve => req.on('end', resolve))

  const params = {
    req,
    res,
    body
  }

  // get all
  if (url === '/posts' && method === 'GET') getAll(params, Post)
  // get one
  else if (url.startsWith('/posts/') && method === 'GET') getOne(params, Post)
  // post one or many (according is array or not)
  else if (url === '/posts' && method === 'POST') postOneOrMany(params, Post)
  // delete all
  else if (url === '/posts' && method === 'DELETE') deleteAll(params, Post)
  // delete one (by id)
  else if (url.startsWith('/posts/') && method === 'DELETE') deleteOne(params, Post)
  // patch one (by id)
  else if (url.startsWith('/posts/') && method === 'PATCH') patchOne(params, Post)
  // options
  else if (method === 'OPTIONS') {
    res.writeHead(200, HEADERS)
    res.end()
  }
  // 404
  else {
    params.error = null
    errorHandler(params, STATUS.notFound)
  }
}

const server = http.createServer(requestListener)

server.listen(process.env.PORT)