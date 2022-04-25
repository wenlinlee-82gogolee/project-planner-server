const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Project', projectSchema);
