require('dotenv').config();
const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../app');
const table = 'bookmarks';
const testBookmarks = require('./bookmarks.fixture');

describe('Articles Endpoints', function () {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('clean the table', () => db(table).truncate());

  afterEach('cleanup', () => db(table).truncate());

  context('Given there are bookmarks in the bookmarks table', () => {
    beforeEach('insert bookmarks', () => {
      return db.into(table).insert(testBookmarks);
    });

    it('@GET /bookmarks responds with 200 and all bookmarks', () => {
      return supertest(app)
        .get('/bookmarks')
        .set('x-api-key', process.env.API_KEY)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('object');
          expect(body).to.haveOwnProperty('bookmarks');
          return expect(body.bookmarks).to.eql(testBookmarks);
        });
    });

    it('@GET /bookmarks/:id responds with 200 and a single article', () => {
      return supertest(app)
        .get('/bookmarks/1')
        .set('x-api-key', process.env.API_KEY)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('object');
          expect(body).to.haveOwnProperty('bookmark');
          return expect(body.bookmark).to.eql(testBookmarks[0]);
        });
    });

    it('Creates an article, responding with 201 and the new bookmark', () => {
      return supertest(app)
        .post('/bookmarks')
        .set('x-api-key', process.env.API_KEY)
        .send({
          id: 11,
          title: 'Bookmark 1',
          url: 'https://www.google.com',
          description: 'adsfasdfasdf',
          rating: 5
        })
        .expect(201)
        .then(({ body }) => {
          expect(body).to.be.an('object');
          expect(body).to.haveOwnProperty('bookmark');
          return expect(body.bookmark).to.eql({
            id: 11,
            title: 'Bookmark 1',
            url: 'https://www.google.com',
            description: 'adsfasdfasdf',
            rating: 5
          });
        });
    });

    it('Deletes an article responding with 200 and deleted bookmark', () => {
      return supertest(app)
        .delete('/bookmarks/1')
        .set('x-api-key', process.env.API_KEY)
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('object');
          expect(body).to.be.haveOwnProperty('deletedBookmark');
          const expected = testBookmarks[0];
          return expect(body.deletedBookmark).to.eql(expected);
        });
    });
  });

  context('Given there are no bookmarks in the bookmarks table', () => {
    it('@GET /bookmarks responds with an empty array', () => {
      return supertest(app)
        .get('/bookmarks')
        .set('x-api-key', process.env.API_KEY)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('object');
          expect(body).to.haveOwnProperty('bookmarks');
          return expect(body.bookmarks).to.eql([]);
        });
    });

    it('@GET /bookmarks responds 404 status code with message', () => {
      return supertest(app)
        .get('/bookmarks/1039401929')
        .set('x-api-key', process.env.API_KEY)
        .expect('Content-Type', /json/)
        .expect(404)
        .then(({ body }) => {
          expect(body).to.be.an('object');
          expect(body).to.not.haveOwnProperty('bookmark');
          return expect(body).to.eql({
            success: false,
            message: 'Bookmark does not exist'
          });
        });
    });
  });
});
