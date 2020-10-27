const table = 'bookmarks';

exports.getBookmarks = async (db) => {
  const bookmarks = await db(table).select('*');
  return bookmarks;
};

exports.getBookmark = async (db, id) => {
  const bookmarks = await db(table).select('*').where({ id }).first();
  return bookmarks;
};

exports.createBookmark = (db, newBookmark) => {};

exports.updateBookmark = (db, updatedBookmark) => {};

exports.deleteBookmark = (db, id) => {};
