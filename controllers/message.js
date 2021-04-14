const mMsg = require('../models/message');

exports.createMsg = (req, res, next) => {

    const msg = new mMsg({...req.body});
    msg.save().then(() => {
      res.status(201).json({
        message: 'Message enregistré'
      })
    }).catch((error) => {
      res.status(400).json({error})
    })
}

exports.getAll = (req, res, next) => {
    mMsg.find()
    .then(todos => res.status(200).json(todos))
    .catch(error => res.status(400).json({ error }));
}

exports.getOne = (req, res, next) => {
    mMsg.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
}

exports.updateMsg = (req, res, next) => {
    mMsg.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Message modifié'}))
      .catch(error => res.status(400).json({ error }));
}

exports.deleteMsg = (req, res, next) => {
    mMsg.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Message supprimé'}))
      .catch(error => res.status(400).json({ error }));
}