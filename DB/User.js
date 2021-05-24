const mongoose = require('mongoose');

const udata = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  }
});

module.exports = User = mongoose.model('user', udata);
