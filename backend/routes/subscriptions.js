const express = require('express');
const Subscription = require('../models/Subscription');

const router = express.Router();

// Get all subscription plans
router.get('/', async (req, res) => {
  try {
    const plans = await Subscription.find({ isActive: true });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific plan
router.get('/:id', async (req, res) => {
  try {
    const plan = await Subscription.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
