const mConf = require('../models/conference');

exports.getAll = (req, res, next) => {
    mConf.find()
    .then(todos => res.status(200).json(todos))
    .catch(error => res.status(400).json({ error }));
}

exports.getOne = (req, res, next) => {
    mConf.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
}