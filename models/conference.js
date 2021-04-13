const mongoose = require('mongoose');

const conferenceSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: {type: String, required: true}
});

module.exports = mongoose.model('Conferences', conferenceSchema);