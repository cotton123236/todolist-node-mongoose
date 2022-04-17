const { HEADERS, STATUS } = require("./constants")


const successHandler = (params) => {
  const { res, data } = params
  const { code } = STATUS.success
  res.writeHead(code, HEADERS)
  console.log(data)
  res.write(JSON.stringify({
    status: 'success',
    data
  }))
  res.end()
}

const errorHandler = (params, status) => {
  const { res, error } = params
  const { code, message } = status
  res.writeHead(code, HEADERS)
  res.write(JSON.stringify({
    status: 'fail',
    message,
    error
  }))
  res.end()
}


module.exports = {
  successHandler,
  errorHandler
}