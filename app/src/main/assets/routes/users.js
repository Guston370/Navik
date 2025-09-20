const express = require('express');
const Joi = require('joi');
const { pool } = require('../config/database');

const router = express.Router();

// Middleware to check authentication
const requireAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }
    next();
};

// Validation schema for profile updates
const updateProfileSchema = Joi.object({
    full_name: Joi.string().max(100).optional(),
    phone: Joi.string().max(20).optional(),
    date_of_birth: Joi.date().optional()
});

// Get user profile
router.get('/profile', requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId;

        const [users] = await pool.execute(
            'SELECT id, username, email, full_name, phone, date_of_birth, created_at, updated_at FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user: users[0]
        });

    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Update user profile
router.put('/profile', requireAuth, async (req, res) => {
    try {
        // Validate input
        const { error, value } = updateProfileSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const userId = req.session.userId;
        const { full_name, phone, date_of_birth } = value;

        // Build update query dynamically
        const updateFields = [];
        const updateValues = [];

        if (full_name !== undefined) {
            updateFields.push('full_name = ?');
            updateValues.push(full_name);
        }
        if (phone !== undefined) {
            updateFields.push('phone = ?');
            updateValues.push(phone);
        }
        if (date_of_birth !== undefined) {
            updateFields.push('date_of_birth = ?');
            updateValues.push(date_of_birth);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No valid fields to update'
            });
        }

        updateFields.push('updated_at = CURRENT_TIMESTAMP');
        updateValues.push(userId);

        const sql = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
        const [result] = await pool.execute(sql, updateValues);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Get updated user data
        const [users] = await pool.execute(
            'SELECT id, username, email, full_name, phone, date_of_birth, created_at, updated_at FROM users WHERE id = ?',
            [userId]
        );

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: users[0]
        });

    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Get all users (admin only - for future use)
router.get('/', requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId;

        // Check if user is admin (you can implement admin role later)
        const [users] = await pool.execute(
            'SELECT id, username, email, full_name, phone, date_of_birth, created_at, updated_at, is_active FROM users WHERE is_active = true ORDER BY created_at DESC'
        );

        res.json({
            success: true,
            users: users
        });

    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Get user statistics
router.get('/stats', requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId;

        // Get user's test completion stats
        const [testStats] = await pool.execute(
            `SELECT 
                COUNT(*) as total_tests,
                AVG(percentage) as average_score,
                MAX(completed_at) as last_test_date
            FROM test_results 
            WHERE user_id = ?`,
            [userId]
        );

        // Get individual test scores
        const [individualScores] = await pool.execute(
            `SELECT 
                test_type,
                score,
                total_questions,
                percentage,
                completed_at
            FROM test_results 
            WHERE user_id = ? 
            ORDER BY completed_at DESC`,
            [userId]
        );

        res.json({
            success: true,
            stats: {
                totalTests: testStats[0].total_tests || 0,
                averageScore: testStats[0].average_score || 0,
                lastTestDate: testStats[0].last_test_date,
                individualScores: individualScores
            }
        });

    } catch (error) {
        console.error('Get user stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router;
