const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'index', 'dist')));

// Always return index.html so react-router renders the route client-side
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'index', 'dist', 'index.html'));
});

module.exports = app;
