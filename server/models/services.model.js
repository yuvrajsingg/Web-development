import mongoose from 'mongoose'

const ServicesSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'Title is required'
  },
  description: {
    type: String,
    trim: true,
    required: 'Description is required'
  },
  price: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },
  features: {
    type: String,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Services', ServicesSchema);
