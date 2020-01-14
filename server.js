'use strict';

// Declare requirements.
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Declare common variables.
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/', (req, res) => {
  res.send(
    'City Explorer is not ready yet. We are working on it though, so check back soon!'
  );
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
