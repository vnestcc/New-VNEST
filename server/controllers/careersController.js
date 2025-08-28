const axios = require('axios');

// Admin Portal API configuration
const ADMIN_PORTAL_API = process.env.ADMIN_PORTAL_API || 'http://localhost:8081/api';
const API_KEY = process.env.ADMIN_PORTAL_API_KEY || 'your-secure-api-key';

// Get all jobs from Admin Portal
const getAllJobs = async (req, res) => {
  try {
    const response = await axios.get(`${ADMIN_PORTAL_API}/jobs/list`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 5000
    });

    res.status(200).json({
      success: true,
      jobs: response.data.jobs || []
    });
  } catch (error) {
    console.error('Failed to fetch jobs from Admin Portal:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch job listings',
      jobs: []
    });
  }
};

// Get single job by ID from Admin Portal
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${ADMIN_PORTAL_API}/jobs/${id}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 5000
    });

    res.status(200).json({
      success: true,
      job: response.data.job
    });
  } catch (error) {
    console.error('Failed to fetch job from Admin Portal:', error.message);
    if (error.response && error.response.status === 404) {
      res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch job details'
      });
    }
  }
};

module.exports = {
  getAllJobs,
  getJobById
};
