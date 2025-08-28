const db = require('../db');
const adminPortalService = require('../services/adminPortalService');

// Submit abstract
const submitAbstract = async (req, res) => {
  try {
    const { abstract } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!abstract) {
      return res.status(400).json({ message: 'Please provide an idea abstract.' });
    }

    // Check if user already has a pending or approved abstract
    const existingAbstract = await db.query(
      'SELECT * FROM ideas WHERE user_id = $1 AND status IN ($2, $3)',
      [userId, 'pending', 'approved']
    );

    if (existingAbstract.rows.length > 0) {
      return res.status(400).json({
        message: 'You already have a pending or approved abstract. Please wait for admin review or proceed to the next step.'
      });
    }

    // Get user details for submission
    const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    
    // Create new abstract with 'pending' status
    const newAbstract = await db.query(
      'INSERT INTO ideas (user_id, abstract, status, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [userId, abstract, 'pending']
    );

    // Send to Admin Portal
    const submissionData = {
      submissionId: newAbstract.rows[0].id,
      userId: userId,
      userName: user.rows[0].name,
      userEmail: user.rows[0].email,
      type: 'abstract',
      content: {
        abstract: abstract
      },
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    const adminPortalResult = await adminPortalService.sendSubmission(submissionData);
    if (!adminPortalResult.success) {
      console.warn('Failed to sync with Admin Portal:', adminPortalResult.error);
    }

    res.status(201).json({
      message: 'Abstract submitted successfully. It is now pending review.',
      abstract: newAbstract.rows[0]
    });
  } catch (error) {
    console.error('Abstract submission error:', error);
    res.status(500).json({ message: 'Server error during abstract submission.' });
  }
};

// Get user's abstract status
const getAbstractStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's latest abstract
    const abstract = await db.query(
      'SELECT * FROM ideas WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
      [userId]
    );

    if (abstract.rows.length === 0) {
      return res.status(404).json({ message: 'No abstract found. Please submit one.' });
    }

    res.status(200).json({
      abstract: abstract.rows[0]
    });
  } catch (error) {
    console.error('Get abstract status error:', error);
    res.status(500).json({ message: 'Server error while fetching abstract status.' });
  }
};

// Step 2: Submit detailed form (only if abstract is approved)
const submitDetails = async (req, res) => {
  try {
    const { full_description, documents_url } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!full_description) {
      return res.status(400).json({ message: 'Please provide a full description.' });
    }

    // Check if user has an approved abstract
    const approvedAbstract = await db.query(
      'SELECT * FROM ideas WHERE user_id = $1 AND status = $2',
      [userId, 'approved']
    );

    if (approvedAbstract.rows.length === 0) {
      return res.status(403).json({
        message: 'You need an approved abstract before submitting detailed information.'
      });
    }

    // Check if user already has a pending or approved details submission
    const existingDetails = await db.query(
      'SELECT * FROM details WHERE user_id = $1 AND status IN ($2, $3)',
      [userId, 'pending', 'approved']
    );

    if (existingDetails.rows.length > 0) {
      return res.status(400).json({
        message: 'You already have a pending or approved detailed submission. Please wait for admin review or proceed to the next step.'
      });
    }

    // Create new details submission with 'pending' status
    const newDetails = await db.query(
      'INSERT INTO details (user_id, full_description, documents_url, status, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [userId, full_description, documents_url || null, 'pending']
    );

    // Get user details for submission
    const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    
    // Send to Admin Portal
    const submissionData = {
      submissionId: newDetails.rows[0].id,
      userId: userId,
      userName: user.rows[0].name,
      userEmail: user.rows[0].email,
      type: 'details',
      content: {
        full_description: full_description,
        documents_url: documents_url || null
      },
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    const adminPortalResult = await adminPortalService.sendSubmission(submissionData);
    if (!adminPortalResult.success) {
      console.warn('Failed to sync with Admin Portal:', adminPortalResult.error);
    }

    res.status(201).json({
      message: 'Detailed information submitted successfully. It is now pending review.',
      details: newDetails.rows[0]
    });
  } catch (error) {
    console.error('Details submission error:', error);
    res.status(500).json({ message: 'Server error during details submission.' });
  }
};

// Get user's details status
const getDetailsStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's latest details submission
    const details = await db.query(
      'SELECT * FROM details WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
      [userId]
    );

    if (details.rows.length === 0) {
      return res.status(404).json({ message: 'No detailed submission found.' });
    }

    res.status(200).json({
      details: details.rows[0]
    });
  } catch (error) {
    console.error('Get details status error:', error);
    res.status(500).json({ message: 'Server error while fetching details status.' });
  }
};

// Step 3: Schedule pitch (only if details are approved)
const schedulePitch = async (req, res) => {
  try {
    const { scheduled_date, notes } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!scheduled_date) {
      return res.status(400).json({ message: 'Please provide a scheduled date for the pitch.' });
    }

    // Check if user has approved details
    const approvedDetails = await db.query(
      'SELECT * FROM details WHERE user_id = $1 AND status = $2',
      [userId, 'approved']
    );

    if (approvedDetails.rows.length === 0) {
      return res.status(403).json({
        message: 'You need approved detailed submission before scheduling a pitch.'
      });
    }

    // Check if user already has a scheduled pitch
    const existingPitch = await db.query(
      'SELECT * FROM pitches WHERE user_id = $1',
      [userId]
    );

    if (existingPitch.rows.length > 0) {
      return res.status(400).json({
        message: 'You already have a scheduled pitch.'
      });
    }

    // Create new pitch with 'scheduled' status
    const newPitch = await db.query(
      'INSERT INTO pitches (user_id, scheduled_date, notes, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, scheduled_date, notes || null, 'scheduled']
    );

    // Get user details for submission
    const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    
    // Send to Admin Portal
    const submissionData = {
      submissionId: newPitch.rows[0].id,
      userId: userId,
      userName: user.rows[0].name,
      userEmail: user.rows[0].email,
      type: 'pitch',
      content: {
        scheduled_date: scheduled_date,
        notes: notes || null
      },
      status: 'scheduled',
      submittedAt: new Date().toISOString()
    };

    const adminPortalResult = await adminPortalService.sendSubmission(submissionData);
    if (!adminPortalResult.success) {
      console.warn('Failed to sync with Admin Portal:', adminPortalResult.error);
    }

    res.status(201).json({
      message: 'Pitch scheduled successfully.',
      pitch: newPitch.rows[0]
    });
  } catch (error) {
    console.error('Pitch scheduling error:', error);
    res.status(500).json({ message: 'Server error during pitch scheduling.' });
  }
};

// Get user's pitch status
const getPitchStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's pitch
    const pitch = await db.query(
      'SELECT * FROM pitches WHERE user_id = $1',
      [userId]
    );

    if (pitch.rows.length === 0) {
      return res.status(404).json({ message: 'No pitch scheduled yet.' });
    }

    res.status(200).json({
      pitch: pitch.rows[0]
    });
  } catch (error) {
    console.error('Get pitch status error:', error);
    res.status(500).json({ message: 'Server error while fetching pitch status.' });
  }
};

// Get all user's submissions (all steps)
const getAllUserSubmissions = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's abstract
    const abstract = await db.query(
      'SELECT * FROM ideas WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
      [userId]
    );

    // Get user's details
    const details = await db.query(
      'SELECT * FROM details WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
      [userId]
    );

    // Get user's pitch
    const pitch = await db.query(
      'SELECT * FROM pitches WHERE user_id = $1',
      [userId]
    );

    res.status(200).json({
      abstract: abstract.rows[0] || null,
      details: details.rows[0] || null,
      pitch: pitch.rows[0] || null
    });
  } catch (error) {
    console.error('Get all submissions error:', error);
    res.status(500).json({ message: 'Server error while fetching all submissions.' });
  }
};

module.exports = {
  submitAbstract,
  getAbstractStatus,
  submitDetails,
  getDetailsStatus,
  schedulePitch,
  getPitchStatus,
  getAllUserSubmissions
};