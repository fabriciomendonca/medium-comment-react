// Heroku URL
// https://boiling-beach-42579.herokuapp.com/

const express = require('express');
const fallback = require('express-history-api-fallback');
const path = require('path');

const app = express();
const root = path.join(__dirname, '/dist');

app.use(express.static(root));
app.use(fallback('index.html', { root }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});