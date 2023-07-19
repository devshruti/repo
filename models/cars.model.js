const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
});

const CarModel = mongoose.model('car', carSchema);

module.exports = { CarModel };
