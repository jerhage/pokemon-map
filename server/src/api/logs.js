const { Router } = require('express');
const mongoose = require('mongoose');
const LogEntry = require('../models/LogEntry');

const router = Router();

// GET entries
router.get('/', async (req, res, next) => {
  try {
    // Find all entires in the collection
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

// POST entries
router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    // Help determine if our data is invalid (client) vs a server side error
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

// DELETE by id **setup later

// router.delete('/:id', (req, res, next) => {
//   LogEntry.findOneAndDelete({ _id: req.params.id }, (error) => {
//     if (error) {
//       next(error);
//     } else {
//       res.send('success');
//     }
//   });
// });

module.exports = router;
