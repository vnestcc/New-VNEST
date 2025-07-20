const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");
const authMiddleware = require("../middleware/authMiddleware");
/**
 * @swagger
 * tags:
 *   name: Form
 *   description: Authenticated user submission flow (abstract → details → pitch)
 */

// Apply authentication middleware to all routes
router.use(authMiddleware);

/**
 * @swagger
 * /api/forms/abstract:
 *   post:
 *     summary: Submit an abstract for your startup idea
 *     tags: [Form]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - abstract
 *             properties:
 *               abstract:
 *                 type: string
 *                 example: "An AI-powered job matching platform for freelancers"
 *     responses:
 *       201:
 *         description: Abstract submitted and pending review
 *       400:
 *         description: Missing abstract or already submitted
 *       500:
 *         description: Server error
 */
router.post("/abstract", formController.submitAbstract);

/**
 * @swagger
 * /api/forms/abstract:
 *   get:
 *     summary: Get the current status of your submitted abstract
 *     tags: [Form]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Abstract status returned
 *       404:
 *         description: No abstract found
 *       500:
 *         description: Server error
 */
router.get("/abstract", formController.getAbstractStatus);

/**
 * @swagger
 * /api/forms/details:
 *   post:
 *     summary: Submit detailed information (after abstract is approved)
 *     tags: [Form]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_description
 *             properties:
 *               full_description:
 *                 type: string
 *                 example: "Our platform uses NLP to analyze freelancer resumes and match them with relevant job descriptions..."
 *               documents_url:
 *                 type: string
 *                 example: "https://docs.google.com/document/d/..."
 *     responses:
 *       201:
 *         description: Details submitted successfully
 *       400:
 *         description: Missing input or already submitted
 *       403:
 *         description: Abstract not yet approved
 *       500:
 *         description: Server error
 */
router.post("/details", formController.submitDetails);

/**
 * @swagger
 * /api/forms/details:
 *   get:
 *     summary: Get the current status of your detailed submission
 *     tags: [Form]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Detailed submission status returned
 *       404:
 *         description: No detailed submission found
 *       500:
 *         description: Server error
 */
router.get("/details", formController.getDetailsStatus);

/**
 * @swagger
 * /api/forms/pitch:
 *   post:
 *     summary: Schedule a pitch session (after details are approved)
 *     tags: [Form]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - scheduled_date
 *             properties:
 *               scheduled_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-07-22T14:30:00Z"
 *               notes:
 *                 type: string
 *                 example: "Preferably in the afternoon"
 *     responses:
 *       201:
 *         description: Pitch scheduled
 *       400:
 *         description: Already scheduled
 *       403:
 *         description: Details not yet approved
 *       500:
 *         description: Server error
 */
router.post("/pitch", formController.schedulePitch);

/**
 * @swagger
 * /api/forms/pitch:
 *   get:
 *     summary: Get status of your scheduled pitch
 *     tags: [Form]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pitch status returned
 *       404:
 *         description: No pitch found
 *       500:
 *         description: Server error
 */
router.get("/pitch", formController.getPitchStatus);

/**
 * @swagger
 * /api/forms/all:
 *   get:
 *     summary: Get all your form submissions (abstract, details, pitch)
 *     tags: [Form]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All form stages returned
 *       500:
 *         description: Server error
 */
router.get("/all", formController.getAllUserSubmissions);

module.exports = router;
