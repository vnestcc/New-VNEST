const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Step 1: Submit idea abstract
router.post('/abstract', formController.submitAbstract);

// Get user's abstract status
router.get('/abstract', formController.getAbstractStatus);

// Step 2: Submit detailed form (only if abstract is approved)
router.post('/details', formController.submitDetails);

// Get user's details status
router.get('/details', formController.getDetailsStatus);

// Step 3: Schedule pitch (only if details are approved)
router.post('/pitch', formController.schedulePitch);

// Get user's pitch status
router.get('/pitch', formController.getPitchStatus);

// Get all user's submissions (all steps)
router.get('/all', formController.getAllUserSubmissions);

module.exports = router;