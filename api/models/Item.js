const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [String],
    startingPrice: { type: Number, required: true },
    currentPrice: Number,
    auctionStartTime: Date,
    auctionEndTime: Date,
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }]
  });
module.exports = mongoose.model('Item', itemSchema);