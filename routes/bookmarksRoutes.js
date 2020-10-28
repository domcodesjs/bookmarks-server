const express = require('express');
const router = express.Router();
const { validateAPIKey } = require('../controllers/authController');
const {
  getBookmarks,
  deleteBookmark,
  addBookmark,
  getBookmark,
  updateBookmark,
  checkData,
  checkUpdatedData
} = require('../controllers/bookmarksController');

router.get('/', validateAPIKey, getBookmarks);
router.get('/:id', validateAPIKey, getBookmark);
router.post('/', validateAPIKey, checkData, addBookmark);
router.patch('/:id', validateAPIKey, checkUpdatedData, updateBookmark);
router.delete('/:id', validateAPIKey, deleteBookmark);

module.exports = router;
