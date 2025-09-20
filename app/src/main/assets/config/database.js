const mysql = require('mysql2/promise');
require('dotenv').config();

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'navik_career_guidance',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✓ Database connected successfully');
        connection.release();
        return true;
    } catch (error) {
        console.error('✗ Database connection failed:', error.message);
        return false;
    }
}

// Initialize database and tables
async function initializeDatabase() {
    try {
        // Create database if it doesn't exist
        const createDbQuery = `CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`;
        await pool.execute(createDbQuery);
        console.log(`✓ Database '${dbConfig.database}' created/verified`);

        // Use the database
        await pool.execute(`USE ${dbConfig.database}`);

        // Create users table
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                full_name VARCHAR(100),
                phone VARCHAR(20),
                date_of_birth DATE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                is_active BOOLEAN DEFAULT TRUE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `;
        
        await pool.execute(createUsersTable);
        console.log('✓ Users table created/verified');

        // Create test results table
        const createResultsTable = `
            CREATE TABLE IF NOT EXISTS test_results (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                test_type VARCHAR(50) NOT NULL,
                score INT NOT NULL,
                total_questions INT NOT NULL,
                percentage DECIMAL(5,2) NOT NULL,
                answers JSON,
                completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `;
        
        await pool.execute(createResultsTable);
        console.log('✓ Test results table created/verified');

        // Create user sessions table
        const createSessionsTable = `
            CREATE TABLE IF NOT EXISTS user_sessions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                session_id VARCHAR(128) NOT NULL,
                ip_address VARCHAR(45),
                user_agent TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                expires_at TIMESTAMP NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                INDEX idx_session_id (session_id),
                INDEX idx_user_id (user_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `;
        
        await pool.execute(createSessionsTable);
        console.log('✓ User sessions table created/verified');

        // Create sample admin user
        const bcrypt = require('bcryptjs');
        const adminPassword = await bcrypt.hash('admin123', 10);
        
        // Check if admin user already exists
        const [existingAdmin] = await pool.execute(
            'SELECT id FROM users WHERE username = ? OR email = ?',
            ['admin', 'admin@navik.com']
        );
        
        if (existingAdmin.length === 0) {
            await pool.execute(
                'INSERT INTO users (username, email, password, full_name, is_active) VALUES (?, ?, ?, ?, ?)',
                ['admin', 'admin@navik.com', adminPassword, 'Administrator', true]
            );
            console.log('✓ Sample admin user created (username: admin, password: admin123)');
        } else {
            console.log('✓ Admin user already exists');
        }

        console.log('\n🎉 Database initialization complete!');
        return true;
    } catch (error) {
        console.error('✗ Database initialization failed:', error.message);
        return false;
    }
}

// Close database connection
async function closeConnection() {
    try {
        await pool.end();
        console.log('✓ Database connection closed');
    } catch (error) {
        console.error('✗ Error closing database connection:', error.message);
    }
}

module.exports = {
    pool,
    testConnection,
    initializeDatabase,
    closeConnection
};
