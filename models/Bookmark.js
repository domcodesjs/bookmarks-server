const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    minlength: 1,
    required: true
  },
  url: {
    type: String,
    minlength: 5,
    required: true
  },
  desc: {
    type: String,
    minlength: 1
  },
  rating: {
    type: Number
  }
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
