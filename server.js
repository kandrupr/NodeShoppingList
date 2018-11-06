const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Tells us where to find the routes
const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log("Mongo Connected"))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

// Pick whatever is in the environment variable or port 5000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));