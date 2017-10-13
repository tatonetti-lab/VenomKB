const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const systemiceffect = require('../models/SystemicEffect.js');

const vkbid_reg = /E\d{7}/;

/* GET /systemiceffects listing. */
router.get('/', (req, res, next) => {
  //systemiceffect.find({}).sort({ updatedAt: -1 }).exec((err, systemiceffects) => {
  systemiceffect.find({}).exec((err, systemiceffects) => {
    if (err) return next(err);
    res.json(systemiceffects);
  });
});

/* POST /systemiceffects */
router.post('/', (req, res, next) => {
  systemiceffect.create(req.body,  (err, systemiceffects) => {
    if (err) return next(err);
    console.log('New systemiceffect created:');
    console.log(systemiceffects);
    res.json(systemiceffects);
  });
});

/* GET /systemiceffects/index */
router.get('/index', (req, res, next) => {
  systemiceffect.find({}, {venomkb_id: 1, name: 1, venom_ref: 1}).exec((err, systemiceffects_ind) => {
    if (err) return next(err);
    res.json(systemiceffects_ind);
  });
});


/* GET /systemiceffects/id */
router.get('/:id', (req, res, next) => {
  if (vkbid_reg.test(req.params.id)) {
    console.log("Find by VenomKB id");
    systemiceffect.find({ 'venomkb_id': req.params.id }, (err, systemiceffect) => {
      if (err) return handleError(err);
      res.json(systemiceffect);
    });
  } else {
    console.log("Find by id");
    systemiceffect.findById(req.params.id, (err, systemiceffects) => {
      if (err) return next(err);
      res.json(systemiceffects);
    });
  }
});

/* PUT /systemiceffects/:id */
router.put('/:id', (req, res, next) => {
  systemiceffect.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {
    if (err) return next(err);
    res.json(systemiceffects);
  });
});

/* DELETE /systemiceffects/:id */
router.delete('/:id', (req, res, next) => {
  systemiceffect.findByIdAndRemove(req.params.id, req.body, (err, todo) => {
    if (err) return next(err);
    console.log('systemiceffect deleted:');
    console.log(systemiceffects);
    res.json(systemiceffects);
  });
});

module.exports = router;
