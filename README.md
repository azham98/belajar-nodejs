# belajar-nodejs

Latihan belajar Node.js & Express — a collection of course exercises working up
from Node core modules to a full CRUD contact app backed by MongoDB.

Each numbered folder is a self-contained project with its own `package.json`.
The numbering follows the course video order, so the later folders show the same
app getting progressively more capable.

## Tech stack

Node.js · Express · EJS (+ express-ejs-layouts) · MongoDB / Mongoose ·
express-validator · connect-flash · morgan · method-override

## Getting started

```bash
git clone https://github.com/azham98/belajar-nodejs.git
cd belajar-nodejs
```

`node_modules/` is not committed, so install dependencies inside whichever
exercise you want to run:

```bash
cd 24-mongo-contact-app
npm install
node app.js
```

Every web exercise listens on **http://localhost:3000**.

## The exercises

| Folder | What it covers |
|---|---|
| [7-node-core-module](7-node-core-module/) | Core modules — `fs` and `readline` CLI that writes contacts to a JSON file |
| [8-npm](8-npm/) | Installing third-party packages (`validator`), `npm start` with nodemon |
| [13-nodejs-web-server](13-nodejs-web-server/) | HTTP server with the built-in `http` module, serving static HTML |
| [14-express-web-server](14-express-web-server/) | Same server rewritten in Express — basic routing and `res.sendFile` |
| [15-express-web-engine](15-express-web-engine/) | EJS as the view engine, shared layouts and a nav partial |
| [16-express-middleware](16-express-middleware/) | Middleware — `morgan` logging and `express.static` for CSS/images |
| [17-express-contact-app](17-express-contact-app/) | Contact app v1 — read contacts from JSON, list + detail pages |
| [18-express-contact-app-2](18-express-contact-app-2/) | v2 — add a contact, form validation with `express-validator`, flash messages |
| [19-express-contact-app-3](19-express-contact-app-3/) | v3 — full CRUD on the JSON file (add, edit, delete) |
| [22-coba-mongo](22-coba-mongo/) | First look at the native `mongodb` driver — setting up a `MongoClient` |
| [23-mongo-contact-app](23-mongo-contact-app/) | Contact app moved onto MongoDB with Mongoose — list + detail |
| [24-mongo-contact-app](24-mongo-contact-app/) | Full CRUD on MongoDB, with `method-override` for real PUT/DELETE requests |

## MongoDB exercises

Folders `22`, `23` and `24` expect a MongoDB server running locally at
`mongodb://127.0.0.1:27017`. The two contact apps use a database named `wpu`.

```bash
brew services start mongodb-community
```

The connection string lives in `utils/db.js` (or `app.js` for `22-coba-mongo`)
if you need to point it somewhere else.

## Notes

Study notes kept while following along are in [info.txt](info.txt).
