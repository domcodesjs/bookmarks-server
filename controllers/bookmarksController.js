const mongoose = require('mongoose');
const Bookmark = mongoose.model('Bookmark');
const { nanoid } = require('nanoid');

exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find().select('-_id');
    return res.json({
      success: true,
      messsage: 'Successfully retrieved bookmarks',
      bookmarks
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      messsage: 'Your request failed.'
    });
  }
};

exports.addBookmark = async (req, res) => {
  try {
    const bookmark = new Bookmark(req.body);
    bookmark.id = nanoid();
    await bookmark.save();
    // omit _id from being sent to the front end
    const { _id, ...restOfBookmark } = bookmark._doc;
    return res.json({
      success: true,
      messsage: 'Successfully added bookmark',
      bookmark: restOfBookmark
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      messsage: 'Your request failed.'
    });
  }
};

exports.getBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({ id: req.params.id }).select(
      '-_id'
    );

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        messsage: 'Bookmark does not exist'
      });
    }

    return res.json({
      success: true,
      messsage: 'Successfully retrieved bookmark',
      bookmark: bookmark
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      messsage: 'Your request failed.'
    });
  }
};

exports.deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({ id: req.params.id });

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        messsage: "You can't delete a bookmark that doesn't exist"
      });
    }

    return res.json({
      success: true,
      messsage: 'Successfully deleted bookmark',
      id: bookmark.id
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      messsage: 'Your request failed.'
    });
  }
};

exports.checkData = (req, res, next) => {
  const { title, url, desc, rating } = req.body;
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
    return res.json({
      success: false,
      message: 'You must provide a title'
    });
  }

  if (!url) {
    return res.json({
      success: false,
      message: 'You must provide a URL'
    });
  }

  if (title.trim().length < 1) {
    return res.json({
      success: false,
      message: 'You must provide a title length greater than 1'
    });
  }

  if (url.trim().length <= 5) {
    return res.json({
      success: false,
      message: 'You must provide a URL length greater than 1'
    });
  }

  if (!protocolPattern.test(url)) {
    return res.json({
      success: false,
      message: 'You must provide a protocol in your URL'
    });
  }

  if (!pattern.test(url)) {
    return res.json({
      success: false,
      message: 'You must provide a properly formatted URL'
    });
  }

  if (desc && desc.trim().length < 1) {
    return res.json({
      success: false,
      message: 'You must provide a description length greater than 1'
    });
  }

  if (rating && (rating < 1 || rating > 5)) {
    return res.json({
      success: false,
      message: 'You must provide a rating between 1 and 5'
    });
  }

  next();
};
