const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  message: { type: String, required: true },
  conference: {type: String, required: true},
  user: {type: String, required: true}
});

module.exports = mongoose.model('Message', messageSchema);