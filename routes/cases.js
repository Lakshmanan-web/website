const express = require('express');
const router = express.Router();
const PhoneCase = require('../models/PhoneCase');

// Get all phone cases
router.get('/cases', async (req, res) => {
  try {
    const cases = await PhoneCase.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, cases });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Add a new phone case
router.post('/cases', async (req, res) => {
  try {
    const { name, color, price, image, description } = req.body;
    
    const newCase = new PhoneCase({
      name,
      color,
      price,
      image,
      description
    });
    
    const savedCase = await newCase.save();
    res.status(201).json({ success: true, case: savedCase });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update a phone case
router.put('/cases/:id', async (req, res) => {
  try {
    const { name, color, price, image, description, inStock } = req.body;
    
    const updatedCase = await PhoneCase.findByIdAndUpdate(
      req.params.id,
      { name, color, price, image, description, inStock },
      { new: true }
    );
    
    if (!updatedCase) {
      return res.status(404).json({ success: false, error: 'Phone case not found' });
    }
    
    res.status(200).json({ success: true, case: updatedCase });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete a phone case
router.delete('/cases/:id', async (req, res) => {
  try {
    const deletedCase = await PhoneCase.findByIdAndDelete(req.params.id);
    
    if (!deletedCase) {
      return res.status(404).json({ success: false, error: 'Phone case not found' });
    }
    
    res.status(200).json({ success: true, message: 'Phone case deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router; 