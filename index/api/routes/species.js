const express = require('express');
const router = express.Router();
const species = require('../models/Species.js');

const vkbid_reg = /S\d{7}/;

/* GET /species listing. */
router.get('/', (req, res, next) => {
    species.find({}).exec((err, spec) => {
        if (err) return next(err);
        res.json(spec);
    });
});

/* POST /species */
router.post('/', (req, res, next) => {
    species.create(req.body, (err, spec) => {
        if (err) return next(err);
        console.log('New species created:');
        console.log(spec);
        res.json(spec);
    });
});

/* GET /species/index */
router.get('/index', (req, res, next) => {
    species.find({}, { venomkb_id: 1, name: 1 }).exec((err, species_ind) => {
        if (err) return next(err);
        res.json(species_ind);
    });
});


/* GET /species/id */
router.get('/:id', (req, res, next) => {
    if (vkbid_reg.test(req.params.id)) {
        console.log("Find by VenomKB id");
        species.find({ 'venomkb_id': req.params.id }, (err, spec) => {
            if (err) return handleError(err);
            res.json(spec);
        });
    } else {
        console.log("Find by id");
        species.findById(req.params.id, (err, spec) => {
            if (err) return next(err);
            res.json(spec);
        });
    }
});

// /* PUT /species/:id */
// router.put('/:id', (req, res, next) => {
//     species.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {
//         if (err) return next(err);
//         res.json(species);
//    });
//
//
// * DELETE /species/:id */
// uter.delete('/:id', (req, res, next) => {
//   species.findByIdAndRemove(req.params.id, req.body, (err, todo) => {
//       if (err) return next(err);
//      console.log('species deleted:');
//       console.log(species);
//       res.json(species);
//   });
// ;

module.exports = router;
