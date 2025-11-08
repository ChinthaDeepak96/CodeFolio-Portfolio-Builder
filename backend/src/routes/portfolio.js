const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const { auth, requirePremium } = require('../middleware/auth');

// Public routes
router.get('/public/:slug', portfolioController.getPublicPortfolio);

// Protected routes (require authentication)
router.get('/', auth, portfolioController.getMyPortfolio);
router.put('/', auth, portfolioController.updatePortfolio);
router.put('/publish', auth, portfolioController.togglePublish);
router.put('/template', auth, portfolioController.updateTemplate);
router.put('/theme', auth, portfolioController.updateTheme);
router.get('/analytics', auth, portfolioController.getAnalytics);
router.delete('/', auth, portfolioController.deletePortfolio);

module.exports = router;