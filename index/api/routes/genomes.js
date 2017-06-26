const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const genome = require('../models/Genome.js');

const vkbid_reg = /G\d{7}/;

/* GET /genomes listing. */
router.get('/', (req, res, next) => {
  //genome.find({}).sort({ updatedAt: -1 }).exec((err, genomes) => {
  genome.find({}).exec((err, genomes) => {
    if (err) return next(err);
    res.json(genomes);
  });
});

/* POST /genomes */
router.post('/', (req, res, next) => {
  genome.create(req.body,  (err, genomes) => {
    if (err) return next(err);
    console.log('New genome created:');
    console.log(genomes);
    res.json(genomes);
  });
});

/* GET /genomes/index */
router.get('/index', (req, res, next) => {
  genome.find({}, {venomkb_id: 1, name: 1, venom_ref: 1}).exec((err, genomes_ind) => {
    if (err) return next(err);
    res.json(genomes_ind);
  });
});


/* GET /genomes/id */
router.get('/:id', (req, res, next) => {
  if (vkbid_reg.test(req.params.id)) {
    console.log("Find by VenomKB id");
    genome.find({ 'venomkb_id': req.params.id }, (err, genome) => {
      if (err) return handleError(err);
      res.json(genome);
    });
  } else {
    console.log("Find by id");
    genome.findById(req.params.id, (err, genomes) => {
      if (err) return next(err);
      res.json(genomes);
    });
  }
});

/* PUT /genomes/:id */
router.put('/:id', (req, res, next) => {
  genome.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {
    if (err) return next(err);
    res.json(genomes);
  });
});

/* DELETE /genomes/:id */
router.delete('/:id', (req, res, next) => {
  genome.findByIdAndRemove(req.params.id, req.body, (err, todo) => {
    if (err) return next(err);
    console.log('genome deleted:');
    console.log(genomes);
    res.json(genomes);
  });
});

module.exports = router;
