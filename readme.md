# Bookmarks Server

## [API Link](https://bookmarks-server.domcodesjs.vercel.app/)

Implemented using Node, Express and MongoDB. I tried my best to simulate what Thinkful had going on with their Bookmarks API. So I'm conducting the same validation checks on the data being sent from the front-end that I think is happening on their server.

You'll need an API key to use the API link I posted above or you'll get access denied when trying to make any requests to `/bookmarks`. If you want to test the API out message me and I'll send you an API key which you'll need to attach to your headers as `x-api-key`. Or you could just fork this

### API Endpoints

- @GET /bookmarks (retrieves all bookmarks)
- @GET /bookmarks/:id (retrievesbookmark)
- @POST /bookmarks/:id (creates a bookmark)
- @DELETE /bookmarks/:id (deletes a bookmark)

### SEED DB

`psql -U dunder_mifflin -d bookmarks -f ./seeds/seed.bookmarks.sql`
`psql -U dunder_mifflin -d bookmarks-test -f ./seeds/seed.bookmarks.sql`
