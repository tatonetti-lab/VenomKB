const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dbindexitem = require('../models/Dbindexitem.js');

router.get('/', (req, res, next) => {
    dbindexitem.find({}).exec((err, dbindexitems) => {
        if (err) return next(err);
        res.json(dbindexitems);
    });
});

router.get('/hello', function(req, res, next) {
    res.send('Howdy!');
});

module.exports = router;
