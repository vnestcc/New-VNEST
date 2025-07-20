const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only endpoints for reviewing submissions, pitches, and users
 */

/**
 * @swagger
 * /api/admin/abstracts:
 *   get:
 *     summary: Retrieve all idea abstracts with user info
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of all submitted abstracts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                 abstracts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       status:
 *                         type: string
 *                         example: pending
 *                       user_id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *       500:
 *         description: Server error while fetching abstracts
 */
router.get("/abstracts", adminController.getAllAbstracts);

/**
 * @swagger
 * /api/admin/abstracts/{id}:
 *   patch:
 *     summary: Update the status of an abstract
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Abstract ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *                 example: approved
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       400:
 *         description: Invalid status
 *       404:
 *         description: Abstract not found
 *       500:
 *         description: Server error
 */
router.patch("/abstracts/:id", adminController.updateAbstractStatus);

/**
 * @swagger
 * /api/admin/details:
 *   get:
 *     summary: Retrieve all detailed submissions with user info
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of all detailed submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       user_id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       problem:
 *                         type: string
 *                       solution:
 *                         type: string
 *                       status:
 *                         type: string
 *                         example: pending
 *       500:
 *         description: Server error while fetching details
 */
router.get("/details", adminController.getAllDetails);

/**
 * @swagger
 * /api/admin/pitches:
 *   get:
 *     summary: Retrieve all scheduled pitches with user info
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of all pitch schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                 pitches:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       user_id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       scheduled_date:
 *                         type: string
 *                         format: date-time
 *                       status:
 *                         type: string
 *                         example: scheduled
 *       500:
 *         description: Server error while fetching pitches
 */
router.get("/pitches", adminController.getAllPitches);

/**
 * @swagger
 * /api/admin/details/{id}:
 *   patch:
 *     summary: Update the status of a detailed submission
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Details ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *                 example: approved
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       400:
 *         description: Invalid status
 *       404:
 *         description: Details not found
 *       500:
 *         description: Server error
 */
router.patch("/details/:id", adminController.updateDetailsStatus);

/**
 * @swagger
 * /api/admin/pitches/{id}:
 *   patch:
 *     summary: Update the status of a pitch
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Pitch ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [scheduled, completed, cancelled]
 *                 example: completed
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       400:
 *         description: Invalid status
 *       404:
 *         description: Pitch not found
 *       500:
 *         description: Server error
 */
router.patch("/pitches/:id", adminController.updatePitchStatus);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Retrieve all registered users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Server error while fetching users
 */
router.get("/users", adminController.getAllUsers);

module.exports = router;
