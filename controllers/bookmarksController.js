const {
  getBookmarks,
  getBookmark,
  createBookmark,
  deleteBookmark
} = require('../services/bookmarksService');

exports.getBookmarks = async (req, res) => {
  try {
    const db = req.app.get('db');
    const bookmarks = await getBookmarks(db);

    res.json({ success: true, bookmarks });
  } catch (err) {
    res.json({
      success: false,
      message: 'Could not get bookmarks'
    });
  }
};

exports.getBookmark = async (req, res) => {
  try {
    const db = req.app.get('db');
    const { id } = req.params;

    const bookmark = await getBookmark(db, id);

    if (!bookmark) {
      return res.status(400).json({
        success: false,
        message: 'Bookmark does not exist'
      });
    }

    res.json({ success: true, bookmark });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Could not get bookmark'
    });
  }
};

exports.addBookmark = async (req, res) => {
  try {
    const db = req.app.get('db');
    const newBookmark = await createBookmark(db, req.body);
    res.status(201).json({
      success: true,
      bookmark: newBookmark
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Could not create bookmark'
    });
  }
};

exports.deleteBookmark = async (req, res) => {
  try {
    const db = req.app.get('db');
    const { id } = req.params;
    const deletedBookmark = await deleteBookmark(db, id);

    if (!deletedBookmark) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete a bookmark that does not exist'
      });
    }

    res.json({ success: true, deletedBookmark });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Could not delete bookmark'
    });
  }
};

exports.checkData = (req, res, next) => {
  const { title, url, description, rating } = req.body;
  const protocolPattern = new RegExp('^(https?:\\/\\/)');
  const pattern = new RegExp(
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );

  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'You must provide a title'
    });
  }

  if (!url) {
    return res.status(400).json({
      success: false,
      message: 'You must provide a URL'
    });
  }

  if (title.trim().length < 1) {
    return res.status(400).json({
      success: false,
      message: 'You must provide a title length greater than 1'
    });
  }

  if (url.trim().length <= 5) {
    return res.status(400).json({
      success: false,
      message: 'You must provide a URL length greater than 1'
    });
  }

  if (!protocolPattern.test(url)) {
    return res.status(400).json({
      success: false,
      message: 'You must provide a protocol in your URL'
    });
  }

  if (!pattern.test(url)) {
    return res.status(400).json({
      success: false,
      message: 'You must provide a properly formatted URL'
    });
  }

  if (description && description.trim().length < 1) {
    return res.status(400).json({
      success: false,
      message: 'You must provide a description length greater than 1'
    });
  }

  if (!rating) {
    return res.status(400).json({
      success: false,
      message: 'You must provide a rating'
    });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      message: 'You must provide a rating between 1 and 5'
    });
  }

  next();
};
