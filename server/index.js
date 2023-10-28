require('dotenv').config();

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const {initDB, initMiddlewares, initControllers} = require('./utils/serverInitHelper');

const port = process.env.PORT || 3000;
const clientDistDir = path.join(__dirname, '..', 'client', 'dist');

initDB();

const app = express();

app.use(express.static(clientDistDir));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

initMiddlewares(app);
initControllers(app);

app.use((req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }

  if (req.headers['Accept']?.includes('json')) {
    return next();
  }

  res.sendFile(path.join(clientDistDir, 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
})

app.listen(port, () => {
  console.log(`Server spins on ${ port }`);
});
