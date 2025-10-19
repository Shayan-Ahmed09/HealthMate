import { GoogleGenerativeAI } from '@google/generative-ai';
import AISummary from './models/AISummary.js';
import File from './models/File.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeReport = async (req, res) => {
  try {
    const { fileId } = req.body;

    if (!fileId) {
      return res.status(400).json({ message: 'File ID is required' });
    }

    // Get file from database
    const file = await File.findOne({
      _id: fileId,
      user: req.user.id
    });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // For demo purposes, we'll simulate Gemini analysis
    // In production, you would send the actual file to Gemini
    const analysisResult = await simulateGeminiAnalysis(file);

    // Save analysis result
    const aiSummary = new AISummary({
      user: req.user.id,
      file: fileId,
      ...analysisResult
    });

    await aiSummary.save();

    res.json({
      message: 'Analysis completed successfully',
      summary: {
        english: analysisResult.englishSummary,
        urdu: analysisResult.urduSummary,
        doctorQuestions: analysisResult.doctorQuestions,
        foodSuggestions: analysisResult.foodSuggestions,
        homeRemedies: analysisResult.homeRemedies
      }
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ message: 'Server error during analysis' });
  }
};

// Simulate Gemini analysis (replace with actual Gemini API call)
const simulateGeminiAnalysis = async (file) => {
  // This is a simulation - replace with actual Gemini API integration
  return {
    englishSummary: `This report shows normal ranges for most parameters. Hemoglobin level is slightly low at 11.5 g/dL (normal: 12-16 g/dL). White blood cell count is within normal limits. Platelet count is normal. Liver function tests show normal enzyme levels. Kidney function appears normal with creatinine at 0.8 mg/dL.`,
    urduSummary: `Yeh report zyada tar parameters ke normal range dikhati hai. Hemoglobin level thora kam hai 11.5 g/dL (normal: 12-16 g/dL). White blood cell count normal limits mein hai. Platelet count normal hai. Liver function tests normal enzyme levels dikhate hain. Kidney function normal hai creatinine 0.8 mg/dL ke saath.`,
    abnormalValues: ['Hemoglobin: 11.5 g/dL (Low)'],
    doctorQuestions: [
      'What could be causing my low hemoglobin?',
      'Should I take iron supplements?',
      'What foods can help improve hemoglobin levels?',
      'When should I get my next blood test?'
    ],
    foodSuggestions: {
      avoid: ['Tea/Coffee with meals', 'Processed foods'],
      recommend: ['Spinach', 'Lentils', 'Pomegranate', 'Beetroot', 'Citrus fruits']
    },
    homeRemedies: [
      'Include iron-rich foods in your diet',
      'Get adequate sleep and rest',
      'Stay hydrated throughout the day'
    ]
  };
};

// Actual Gemini integration (commented for now - needs proper setup)
/*
const analyzeWithGemini = async (fileBuffer, mimeType) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `Analyze this medical report and provide:
  1. Simple English summary highlighting key findings
  2. Same summary in Roman Urdu
  3. List of abnormal values
  4. 3-5 questions to ask doctor
  5. Foods to avoid and recommend
  6. Simple home remedies
  
  Format the response as JSON with these keys: englishSummary, urduSummary, abnormalValues, doctorQuestions, foodSuggestions, homeRemedies`;

  let filePart;
  
  if (mimeType === 'application/pdf') {
    filePart = {
      inlineData: {
        data: fileBuffer.toString('base64'),
        mimeType: 'application/pdf'
      }
    };
  } else {
    filePart = {
      inlineData: {
        data: fileBuffer.toString('base64'),
        mimeType: mimeType
      }
    };
  }

  const result = await model.generateContent([prompt, filePart]);
  const response = await result.response;
  const text = response.text();
  
  // Parse the JSON response
  return JSON.parse(text.replace(/```json\n?|\n?```/g, ''));
};
*/