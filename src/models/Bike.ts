import mongoose from 'mongoose';

const bikeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a bike name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  type: {
    type: String,
    required: [true, 'Please specify the bike type'],
    enum: ['Cruiser', 'Sport', 'Adventure', 'Touring', 'Cafe Racer', 'Scooter']
  },
  location: {
    type: String,
    required: [true, 'Please provide the bike location']
  },
  price: {
    type: Number,
    required: [true, 'Please provide the rental price']
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  features: [{
    type: String
  }],
  imageUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['available', 'rented', 'maintenance'],
    default: 'available'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewsCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Bike = mongoose.models.Bike || mongoose.model('Bike', bikeSchema);

export default Bike;