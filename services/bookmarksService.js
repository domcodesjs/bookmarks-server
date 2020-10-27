const table = 'bookmarks';

exports.getBookmarks = async (db) => {
  const bookmarks = await db(table).select('*');
  return bookmarks;
};

exports.getBookmark = async (db, id) => {
  const bookmarks = await db(table).select('*').where({ id }).first();
  return bookmarks;
};

exports.createBookmark = async (db, newBookmark) => {
  return (await db(table).insert(newBookmark).returning('*'))[0];
};

exports.deleteBookmark = async (db, id) => {
  return (await db(table).where({ id }).delete().returning('*'))[0];
};
