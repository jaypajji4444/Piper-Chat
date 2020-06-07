const mongoose = require('mongoose');

const InviteSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ]
  },
  accepted: {
      type: Boolean,
      required: [true, 'Please specify that it is accepted or not']
  },
  acceptedBy: {
      type: String
  }
});

module.exports = mongoose.model('Invites', InviteSchema);