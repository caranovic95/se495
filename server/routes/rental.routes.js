const express = require('express')
const router = express.Router()
const rental = require('../models/rental.model')

router.get('', function (req, res) {
    rental.find({}, function (err, data) {
        res.json(data);
    })
})

router.get('/:id', function (req, res) {
    const rentalId = req.params.id;

    rental.findById(
        rentalId, function (err, data) {
            if (err) {
                res.status(422).send({ errors: [{ title: "Rent error", detail: "Rent does not exist" }] });

            }

            res.json(data);
        }
    )
})

module.exports = router;