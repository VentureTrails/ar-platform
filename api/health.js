// Minimal static server for Vercel - just serves static files from public directory
const path = require('path');
const fs = require('fs');

module.exports = (req, res) => {
  // Just return success for Vercel health check
  res.status(200).json({ status: 'ok' });
};
