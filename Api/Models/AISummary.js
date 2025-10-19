import mongoose from 'mongoose';

const aiSummarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    required: true
  },
  englishSummary: {
    type: String,
    required: true
  },
  urduSummary: {
    type: String,
    required: true
  },
  abnormalValues: [String],
  doctorQuestions: [String],
  foodSuggestions: {
    avoid: [String],
    recommend: [String]
  },
  homeRemedies: [String],
  disclaimer: {
    type: String,
    default: 'AI is for understanding only, not for medical advice. Always consult your doctor.'
  }
}, {
  timestamps: true
});

export default mongoose.model('AISummary', aiSummarySchema);
