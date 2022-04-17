const { STATUS } = require("./constants");
const { successHandler, errorHandler } = require("./handlers")


// get all
const getAll = async (params, model) => {
  if (!model) return;
  const data = await model.find()
  params.data = data
  successHandler(params)
}

// get one
const getOne = async (params, model) => {
  if (!model) return;
  try {
    const { req } = params
    const id = req.url.split('/').pop()
    const data = await model.findById(id)
    params.data = data
    successHandler(params)
  }
  catch(error) {
    params.error = error
    errorHandler(params, STATUS.formatError)
  }
}

// post one or many
const postOneOrMany = async (params, model) => {
  if (!model) return;
  try {
    const { body } = params
    const items = JSON.parse(body)
    let data
    // if is array then post many
    if (Array.isArray(items)) {
      const itemsData = []
      for (const item of items) {
        const { name, content } = item
        if (!content) {
          params.error = null
          return errorHandler(params, STATUS.contentUndefined)
        }
        itemsData.push({
          name,
          content
        })
      }
      data = await model.insertMany(itemsData)
      params.data = data
    }
    // if is not array then post one
    else {
      const { name, content } = items
      if (!content) {
        params.error = null
        return errorHandler(params, STATUS.contentUndefined)
      }
      data = await model.create({
        name,
        content
      })
      params.data = [data]
    }
    successHandler(params)
  }
  catch(error) {
    params.error = error
    errorHandler(params, STATUS.formatError)
  }
}

// delete all
const deleteAll = async (params, model) => {
  if (!model) return;
  await model.deleteMany()
  params.data = []
  successHandler(params)
}

// delete one (by id)
const deleteOne = async (params, model) => {
  if (!model) return;
  try {
    const { req } = params
    const id = req.url.split('/').pop()
    const data = await model.findByIdAndDelete(id)
    params.data = [data]
    successHandler(params)
  }
  catch(error) {
    params.error = error
    errorHandler(params, STATUS.formatError)
  }
}

// patch one (by id)
const patchOne = async (params, model) => {
  if (!model) return;
  try {
    const { req, body } = params
    const items = JSON.parse(body)
    const id = req.url.split('/').pop()
    const { name, content } = items
    let patchData = {}
    if (!content && !name) {
      params.error = null
      return errorHandler(params, STATUS.dataUndefined)
    }
    if (name) patchData.name = name
    if (content) patchData.content = content
    const data = await model.findByIdAndUpdate(id, patchData)
    params.data = [data]
    successHandler(params)
  }
  catch(error) {
    params.error = error
    errorHandler(params, STATUS.formatError)
  }
}


module.exports = {
  getAll,
  getOne,
  postOneOrMany,
  deleteAll,
  deleteOne,
  patchOne
}