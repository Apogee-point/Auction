const mongoose= require('mongoose')

const itemSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Username is required"] 
    },
    description: { 
        type: String, 
        required: true,
        default: "" 
    },
    startingPrice: { 
        type: Number, 
        required: [true, "Starting price is required"] 
    },
    images: [{ type: String, required: true }],
    currentPrice: {
        type: Number,
        default: null
    },
    auctionStartTime: {
        type: Date,
        default: null
    },
    auctionEndTime: {
        type: Date,
        default: null
    },
    seller: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
    isLive: { 
        type: Boolean, 
        default: false 
    },
  });
module.exports = mongoose.model('Item', itemSchema);

// images: {
//     type : Array,
//     required: [true, "Item should contain atleast one image"],
//     default: []
// },