import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true,
    enum: ['lab_report', 'prescription', 'xray', 'ultrasound', 'other']
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('File', fileSchema);
