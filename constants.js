const HEADERS = {
  'Access-Control-Allow-HEADERS': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET, OPTIONS, DELETE',
  'Content-Type': 'application/json'
}

const STATUS = {
  success: {
    code: 200,
    message: 'success'
  },
  formatError: {
    code: 400,
    message: 'data format error or cannot find id'
  },
  contentUndefined: {
    code: 400,
    message: 'content is required'
  },
  dataUndefined: {
    code: 400,
    message: 'name or content is required'
  },
  notFound: {
    code: 404,
    message: '404 NOT FOUND'
  }
}

module.exports = {
  HEADERS,
  STATUS
}