import mongoose from 'mongoose';

const vitalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  bloodPressure: {
    systolic: Number,
    diastolic: Number
  },
  bloodSugar: Number,
  weight: Number,
  height: Number,
  heartRate: Number,
  temperature: Number,
  notes: String
}, {
  timestamps: true
});

export default mongoose.model('Vital', vitalSchema);
