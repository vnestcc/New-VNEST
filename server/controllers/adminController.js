const db = require('../db');

// Get all abstracts with user information
const getAllAbstracts = async (req, res) => {
  try {
    const abstracts = await db.query(
      `SELECT i.*, u.name, u.email 
       FROM ideas i 
       JOIN users u ON i.user_id = u.id 
       ORDER BY i.created_at DESC`
    );
    res.status(200).json({
      count: abstracts.rows.length,
      abstracts: abstracts.rows
    });
  } catch (error) {
    console.error('Get all abstracts error:', error);
    res.status(500).json({ message: 'Server error while fetching abstracts.' });
  }
};

// Get all detailed submissions with user information
const getAllDetails = async (req, res) => {
  try {
    const details = await db.query(
      `SELECT d.*, u.name, u.email 
       FROM details d 
       JOIN users u ON d.user_id = u.id 
       ORDER BY d.created_at DESC`
    );

    res.status(200).json({
      count: details.rows.length,
      details: details.rows
    });
  } catch (error) {
    console.error('Get all details error:', error);
    res.status(500).json({ message: 'Server error while fetching details.' });
  }
};

// Get all pitch schedules with user information
const getAllPitches = async (req, res) => {
  try {
    const pitches = await db.query(
      `SELECT p.*, u.name, u.email 
       FROM pitches p 
       JOIN users u ON p.user_id = u.id 
       ORDER BY p.scheduled_date ASC`
    );

    res.status(200).json({
      count: pitches.rows.length,
      pitches: pitches.rows
    });
  } catch (error) {
    console.error('Get all pitches error:', error);
    res.status(500).json({ message: 'Server error while fetching pitches.' });
  }
};

// Update abstract status (approve/reject)
const updateAbstractStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate input
    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ 
        message: 'Please provide a valid status (pending, approved, or rejected).' 
      });
    }

    // Check if abstract exists
    const abstractExists = await db.query('SELECT * FROM ideas WHERE id = $1', [id]);
    
    if (abstractExists.rows.length === 0) {
      return res.status(404).json({ message: 'Abstract not found.' });
    }

    // Update abstract status
    const updatedAbstract = await db.query(
      'UPDATE ideas SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    res.status(200).json({
      message: `Abstract status updated to ${status}.`,
      abstract: updatedAbstract.rows[0]
    });
  } catch (error) {
    console.error('Update abstract status error:', error);
    res.status(500).json({ message: 'Server error while updating abstract status.' });
  }
};

// Update details status (approve/reject)
const updateDetailsStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate input
    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ 
        message: 'Please provide a valid status (pending, approved, or rejected).' 
      });
    }

    // Check if details exists
    const detailsExists = await db.query('SELECT * FROM details WHERE id = $1', [id]);
    
    if (detailsExists.rows.length === 0) {
      return res.status(404).json({ message: 'Details not found.' });
    }

    // Update details status
    const updatedDetails = await db.query(
      'UPDATE details SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    res.status(200).json({
      message: `Details status updated to ${status}.`,
      details: updatedDetails.rows[0]
    });
  } catch (error) {
    console.error('Update details status error:', error);
    res.status(500).json({ message: 'Server error while updating details status.' });
  }
};

// Update pitch status
const updatePitchStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate input
    if (!status || !['scheduled', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ 
        message: 'Please provide a valid status (scheduled, completed, or cancelled).' 
      });
    }

    // Check if pitch exists
    const pitchExists = await db.query('SELECT * FROM pitches WHERE id = $1', [id]);
    
    if (pitchExists.rows.length === 0) {
      return res.status(404).json({ message: 'Pitch not found.' });
    }

    // Update pitch status
    const updatedPitch = await db.query(
      'UPDATE pitches SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    res.status(200).json({
      message: `Pitch status updated to ${status}.`,
      pitch: updatedPitch.rows[0]
    });
  } catch (error) {
    console.error('Update pitch status error:', error);
    res.status(500).json({ message: 'Server error while updating pitch status.' });
  }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await db.query(
      'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC'
    );

    res.status(200).json({
      count: users.rows.length,
      users: users.rows
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error while fetching users.' });
  }
};

module.exports = {
  getAllAbstracts,
  getAllDetails,
  getAllPitches,
  updateAbstractStatus,
  updateDetailsStatus,
  updatePitchStatus,
  getAllUsers
};