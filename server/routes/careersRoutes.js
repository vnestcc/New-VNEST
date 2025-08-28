const express = require('express');
const { getAllJobs, getJobById } = require('../controllers/careersController');

const router = express.Router();

/**
 * @swagger
 * /api/careers/jobs:
 *   get:
 *     summary: Get all active job listings
 *     tags: [Careers]
 *     responses:
 *       200:
 *         description: List of active jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 jobs:
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
 *                       requirements:
 *                         type: string
 *                       location:
 *                         type: string
 *                       salary:
 *                         type: string
 *                       type:
 *                         type: string
 *                       status:
 *                         type: string
 *                       created_at:
 *                         type: string
 *       500:
 *         description: Server error
 */
router.get('/jobs', getAllJobs);

/**
 * @swagger
 * /api/careers/jobs/{id}:
 *   get:
 *     summary: Get single job by ID
 *     tags: [Careers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 job:
 *                   type: object
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
router.get('/jobs/:id', getJobById);

module.exports = router;
