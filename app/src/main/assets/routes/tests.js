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

// Validation schema for test results
const saveTestResultSchema = Joi.object({
    test_type: Joi.string().valid('numerical', 'personality', 'abstract', 'perceptual', 'verbal', 'spatial').required(),
    score: Joi.number().integer().min(0).required(),
    total_questions: Joi.number().integer().min(1).required(),
    answers: Joi.object().optional()
});

// Get user's test results
router.get('/results', requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId;

        const [results] = await pool.execute(
            'SELECT * FROM test_results WHERE user_id = ? ORDER BY completed_at DESC',
            [userId]
        );

        res.json({
            success: true,
            results: results
        });

    } catch (error) {
        console.error('Get test results error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Save test results
router.post('/results', requireAuth, async (req, res) => {
    try {
        // Validate input
        const { error, value } = saveTestResultSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const userId = req.session.userId;
        const { test_type, score, total_questions, answers } = value;

        // Calculate percentage
        const percentage = (score / total_questions) * 100;

        // Check if user already has results for this test type
        const [existingResults] = await pool.execute(
            'SELECT id FROM test_results WHERE user_id = ? AND test_type = ?',
            [userId, test_type]
        );

        let result;
        if (existingResults.length > 0) {
            // Update existing result
            [result] = await pool.execute(
                'UPDATE test_results SET score = ?, total_questions = ?, percentage = ?, answers = ?, completed_at = CURRENT_TIMESTAMP WHERE user_id = ? AND test_type = ?',
                [score, total_questions, percentage, JSON.stringify(answers), userId, test_type]
            );
        } else {
            // Insert new result
            [result] = await pool.execute(
                'INSERT INTO test_results (user_id, test_type, score, total_questions, percentage, answers) VALUES (?, ?, ?, ?, ?, ?)',
                [userId, test_type, score, total_questions, percentage, JSON.stringify(answers)]
            );
        }

        res.json({
            success: true,
            message: 'Test results saved successfully',
            result: {
                test_type,
                score,
                total_questions,
                percentage: Math.round(percentage * 100) / 100
            }
        });

    } catch (error) {
        console.error('Save test results error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Get specific test result
router.get('/results/:testType', requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId;
        const testType = req.params.testType;

        const [results] = await pool.execute(
            'SELECT * FROM test_results WHERE user_id = ? AND test_type = ? ORDER BY completed_at DESC LIMIT 1',
            [userId, testType]
        );

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Test result not found'
            });
        }

        res.json({
            success: true,
            result: results[0]
        });

    } catch (error) {
        console.error('Get specific test result error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Get test statistics
router.get('/stats', requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId;

        // Get overall statistics
        const [overallStats] = await pool.execute(
            `SELECT 
                COUNT(*) as total_tests,
                AVG(percentage) as average_percentage,
                MAX(percentage) as highest_score,
                MIN(percentage) as lowest_score,
                COUNT(DISTINCT test_type) as tests_completed
            FROM test_results 
            WHERE user_id = ?`,
            [userId]
        );

        // Get statistics by test type
        const [testTypeStats] = await pool.execute(
            `SELECT 
                test_type,
                COUNT(*) as attempts,
                AVG(percentage) as average_percentage,
                MAX(percentage) as best_score,
                MAX(completed_at) as last_attempt
            FROM test_results 
            WHERE user_id = ? 
            GROUP BY test_type
            ORDER BY test_type`,
            [userId]
        );

        // Get recent test history
        const [recentTests] = await pool.execute(
            `SELECT 
                test_type,
                score,
                total_questions,
                percentage,
                completed_at
            FROM test_results 
            WHERE user_id = ? 
            ORDER BY completed_at DESC 
            LIMIT 10`,
            [userId]
        );

        res.json({
            success: true,
            stats: {
                overall: overallStats[0],
                byTestType: testTypeStats,
                recentTests: recentTests
            }
        });

    } catch (error) {
        console.error('Get test stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Delete test result (optional - for retaking tests)
router.delete('/results/:testType', requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId;
        const testType = req.params.testType;

        const [result] = await pool.execute(
            'DELETE FROM test_results WHERE user_id = ? AND test_type = ?',
            [userId, testType]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Test result not found'
            });
        }

        res.json({
            success: true,
            message: 'Test result deleted successfully'
        });

    } catch (error) {
        console.error('Delete test result error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router;
