import File from './models/File.js';
import AISummary from './models/AISummary.js';

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = new File({
      user: req.user.id,
      filename: req.file.filename,
      originalName: req.file.originalname,
      fileType: req.body.fileType || 'lab_report',
      fileUrl: req.file.path,
      fileSize: req.file.size
    });

    await file.save();

    res.status(201).json({
      message: 'File uploaded successfully',
      file: {
        id: file._id,
        filename: file.filename,
        originalName: file.originalName,
        fileUrl: file.fileUrl,
        uploadDate: file.uploadDate
      }
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ message: 'Server error during file upload' });
  }
};

export const getUserFiles = async (req, res) => {
  try {
    const files = await File.find({ user: req.user.id })
      .sort({ uploadDate: -1 })
      .select('-user');

    res.json(files);
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getFileWithSummary = async (req, res) => {
  try {
    const file = await File.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const summary = await AISummary.findOne({ file: file._id });

    res.json({
      file,
      summary
    });
  } catch (error) {
    console.error('Get file error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};