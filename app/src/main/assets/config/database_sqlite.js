const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

// Database file path
const dbPath = path.join(__dirname, 'navik_database.sqlite');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('✓ SQLite database connected successfully');
    }
});

// Initialize database and tables
async function initializeDatabase() {
    return new Promise((resolve, reject) => {
        db.serialize(async () => {
            try {
                // Create users table
                db.run(`
                    CREATE TABLE IF NOT EXISTS users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        username TEXT UNIQUE NOT NULL,
                        email TEXT UNIQUE NOT NULL,
                        password TEXT NOT NULL,
                        full_name TEXT,
                        phone TEXT,
                        date_of_birth TEXT,
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                        is_active BOOLEAN DEFAULT 1
                    )
                `);

                // Create test results table
                db.run(`
                    CREATE TABLE IF NOT EXISTS test_results (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        user_id INTEGER NOT NULL,
                        test_type TEXT NOT NULL,
                        score INTEGER NOT NULL,
                        total_questions INTEGER NOT NULL,
                        percentage REAL NOT NULL,
                        answers TEXT,
                        completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                    )
                `);

                // Create user sessions table
                db.run(`
                    CREATE TABLE IF NOT EXISTS user_sessions (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        user_id INTEGER NOT NULL,
                        session_id TEXT NOT NULL,
                        ip_address TEXT,
                        user_agent TEXT,
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                        expires_at DATETIME NOT NULL,
                        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                    )
                `);

                // Create sample admin user
                const adminPassword = await bcrypt.hash('admin123', 10);
                
                db.get('SELECT id FROM users WHERE username = ? OR email = ?', ['admin', 'admin@navik.com'], (err, row) => {
                    if (err) {
                        console.error('Error checking admin user:', err);
                        reject(err);
                        return;
                    }
                    
                    if (!row) {
                        db.run(
                            'INSERT INTO users (username, email, password, full_name, is_active) VALUES (?, ?, ?, ?, ?)',
                            ['admin', 'admin@navik.com', adminPassword, 'Administrator', 1],
                            function(err) {
                                if (err) {
                                    console.error('Error creating admin user:', err);
                                    reject(err);
                                } else {
                                    console.log('✓ Sample admin user created (username: admin, password: admin123)');
                                    resolve(true);
                                }
                            }
                        );
                    } else {
                        console.log('✓ Admin user already exists');
                        resolve(true);
                    }
                });

                console.log('✓ Database tables created/verified');
            } catch (error) {
                console.error('Database initialization error:', error);
                reject(error);
            }
        });
    });
}

// Test database connection
function testConnection() {
    return new Promise((resolve) => {
        db.get('SELECT 1', (err) => {
            if (err) {
                console.error('✗ Database connection failed:', err.message);
                resolve(false);
            } else {
                console.log('✓ Database connected successfully');
                resolve(true);
            }
        });
    });
}

// Close database connection
function closeConnection() {
    return new Promise((resolve) => {
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('✓ Database connection closed');
            }
            resolve();
        });
    });
}

module.exports = {
    db,
    initializeDatabase,
    testConnection,
    closeConnection
};
