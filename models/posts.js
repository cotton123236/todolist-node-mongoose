const mongoose = require('mongoose')
const { Schema, model } = mongoose


const postSchema = new Schema({
  content: {
    type: String,
    required: [true, 'field "content" is required']
  },
  image: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  name: {
    type: String,
    required: [true, 'field "name" is required']
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  versionKey: false
})

const Post = model('Post', postSchema) 


module.exports = Post