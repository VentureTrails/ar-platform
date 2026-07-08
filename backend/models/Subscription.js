const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['free', 'pro', 'enterprise'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  billingCycle: {
    type: String,
    enum: ['monthly', 'annual'],
    default: 'monthly',
  },
  features: {
    maxUploads: Number,
    storageGb: Number,
    arGoggleBrand: [String], // ['meta-quest', 'hololens', etc.]
    customBranding: Boolean,
    analyticsAccess: Boolean,
    prioritySupport: Boolean,
  },
  stripePriceId: String,
  stripePriceIdAnnual: String,
  description: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
