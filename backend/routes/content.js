const express = require('express');
const auth = require('../middleware/auth');
const { upload, uploadFile, deleteFile } = require('../middleware/upload');
const Content = require('../models/Content');

const router = express.Router();

// Get all user content
router.get('/', auth, async (req, res) => {
  try {
    const content = await Content.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get content by ID
router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id).populate('userId', 'username');
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    content.views += 1;
    await content.save();
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create content with file upload
router.post('/', auth, upload.single('file'), uploadFile, async (req, res) => {
  try {
    const { title, description, tags, isPublic } = req.body;
    
    let imageUrl = req.body.imageUrl;
    let imagePublicId = null;

    // If file was uploaded
    if (req.uploadResult) {
      imageUrl = req.uploadResult.url;
      imagePublicId = req.uploadResult.publicId;
    }

    if (!imageUrl) {
      return res.status(400).json({ error: 'Either file or imageUrl must be provided' });
    }

    const content = new Content({
      userId: req.userId,
      title,
      description,
      imageUrl,
      imagePublicId,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      isPublic: isPublic === 'true',
    });
    
    await content.save();
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update content
router.put('/:id', auth, async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    if (content.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    Object.assign(content, req.body);
    await content.save();
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete content
router.delete('/:id', auth, async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    if (content.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    // Delete from Cloudinary if exists
    if (content.imagePublicId) {
      await deleteFile(content.imagePublicId);
    }
    
    await Content.findByIdAndDelete(req.params.id);
    res.json({ message: 'Content deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
