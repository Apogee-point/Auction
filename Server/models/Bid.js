const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
  });

module.exports = mongoose.model('Bid', bidSchema);

