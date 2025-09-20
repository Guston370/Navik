<?php
// Database Setup Script for Navik Career Guidance Platform
// Run this script once to set up the database and tables

require_once 'config/database.php';

echo "<h2>Navik Database Setup</h2>";

try {
    // Test database connection
    echo "<p>✓ Database connection successful</p>";
    
    // Create database if it doesn't exist
    $pdo->exec("CREATE DATABASE IF NOT EXISTS navik_career_guidance");
    $pdo->exec("USE navik_career_guidance");
    echo "<p>✓ Database 'navik_career_guidance' created/verified</p>";
    
    // Create users table
    $createUsersTable = "
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
    ";
    
    $pdo->exec($createUsersTable);
    echo "<p>✓ Users table created/verified</p>";
    
    // Create test results table
    $createResultsTable = "
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
    ";
    
    $pdo->exec($createResultsTable);
    echo "<p>✓ Test results table created/verified</p>";
    
    // Create sessions table for better session management
    $createSessionsTable = "
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
    ";
    
    $pdo->exec($createSessionsTable);
    echo "<p>✓ User sessions table created/verified</p>";
    
    // Insert a sample admin user (optional)
    $adminUsername = 'admin';
    $adminEmail = 'admin@navik.com';
    $adminPassword = password_hash('admin123', PASSWORD_DEFAULT);
    
    // Check if admin user already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    $stmt->execute([$adminUsername, $adminEmail]);
    
    if (!$stmt->fetch()) {
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password, full_name, is_active) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$adminUsername, $adminEmail, $adminPassword, 'Administrator', true]);
        echo "<p>✓ Sample admin user created (username: admin, password: admin123)</p>";
    } else {
        echo "<p>✓ Admin user already exists</p>";
    }
    
    echo "<h3>Database Setup Complete!</h3>";
    echo "<p>Your Navik Career Guidance Platform database is ready to use.</p>";
    echo "<p><strong>Database:</strong> navik_career_guidance</p>";
    echo "<p><strong>Tables:</strong> users, test_results, user_sessions</p>";
    echo "<p><strong>Sample Admin:</strong> username: admin, password: admin123</p>";
    
} catch (PDOException $e) {
    echo "<p style='color: red;'>✗ Database setup failed: " . $e->getMessage() . "</p>";
} catch (Exception $e) {
    echo "<p style='color: red;'>✗ Setup failed: " . $e->getMessage() . "</p>";
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Database Setup - Navik</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        h2 { color: #2563eb; }
        h3 { color: #1e40af; }
        p { margin: 10px 0; padding: 5px; background: white; border-radius: 4px; }
        .success { color: #059669; }
        .error { color: #dc2626; }
    </style>
</head>
<body>
    <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h1>Navik Career Guidance Platform</h1>
        <p><strong>Database Setup Complete!</strong></p>
        <p>You can now:</p>
        <ul>
            <li>Register new users through the signup page</li>
            <li>Login with existing credentials</li>
            <li>Store test results in the database</li>
            <li>Manage user profiles</li>
        </ul>
        <p><a href="index.html" style="color: #2563eb;">← Back to Login Page</a></p>
    </div>
</body>
</html>
