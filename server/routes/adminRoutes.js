const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Get all abstracts
router.get('/abstracts', adminController.getAllAbstracts);

// Get all detailed submissions
router.get('/details', adminController.getAllDetails);

// Get all pitch schedules
router.get('/pitches', adminController.getAllPitches);

// Update abstract status (approve/reject)
router.patch('/abstracts/:id', adminController.updateAbstractStatus);

// Update details status (approve/reject)
router.patch('/details/:id', adminController.updateDetailsStatus);

// Update pitch status
router.patch('/pitches/:id', adminController.updatePitchStatus);

// Get all users
router.get('/users', adminController.getAllUsers);

module.exports = router;