const express = require('express');
const router = express.Router();
const {
  getBookmarks,
  deleteBookmark,
  addBookmark
} = require('../controllers/bookmarksController');

router.get('/', getBookmarks);
router.post('/', addBookmark);
router.delete('/:id', deleteBookmark);

module.exports = router;
