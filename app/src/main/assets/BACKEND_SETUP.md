# Navik Career Guidance Platform - Backend Setup

## Overview
This document provides instructions for setting up the backend database and API for the Navik Career Guidance Platform.

## Prerequisites
- XAMPP (or similar local server with PHP and MySQL)
- PHP 7.4 or higher
- MySQL 5.7 or higher

## Database Setup

### 1. Start XAMPP Services
1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL** services
3. Ensure both services are running (green status)

### 2. Database Configuration
1. Open `config/database.php`
2. Update database credentials if needed:
   ```php
   $host = 'localhost';
   $dbname = 'navik_career_guidance';
   $username = 'root';
   $password = '';
   ```

### 3. Run Database Setup
1. Open your browser
2. Navigate to: `http://localhost/navik-website-main/setup_database.php`
3. Follow the on-screen instructions
4. The script will create:
   - Database: `navik_career_guidance`
   - Tables: `users`, `test_results`, `user_sessions`
   - Sample admin user (username: admin, password: admin123)

## API Endpoints

### Authentication
- **POST** `/api/register.php` - User registration
- **POST** `/api/login.php` - User login
- **POST** `/api/logout.php` - User logout

### User Management
- **GET** `/api/profile.php` - Get user profile
- **PUT** `/api/profile.php` - Update user profile

### Test Results
- **GET** `/api/test_results.php` - Get user's test results
- **POST** `/api/test_results.php` - Save test results

## Database Schema

### Users Table
```sql
CREATE TABLE users (
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
);
```

### Test Results Table
```sql
CREATE TABLE test_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    test_type VARCHAR(50) NOT NULL,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    answers JSON,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### User Sessions Table
```sql
CREATE TABLE user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_id VARCHAR(128) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Usage Examples

### User Registration
```javascript
const response = await fetch('api/register.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123',
        full_name: 'John Doe',
        phone: '+1234567890',
        date_of_birth: '1995-01-01'
    })
});
```

### User Login
```javascript
const response = await fetch('api/login.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: 'john_doe',
        password: 'password123'
    })
});
```

### Save Test Results
```javascript
const response = await fetch('api/test_results.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        test_type: 'numerical',
        score: 12,
        total_questions: 15,
        answers: { /* user answers */ }
    })
});
```

## Security Features

### Password Security
- Passwords are hashed using PHP's `password_hash()` function
- Uses `PASSWORD_DEFAULT` algorithm (currently bcrypt)
- Minimum password length: 6 characters

### Session Management
- PHP sessions are used for authentication
- Session data is stored securely
- Automatic session cleanup on logout

### Input Validation
- All inputs are validated and sanitized
- SQL injection prevention using prepared statements
- XSS protection through proper output encoding

### CORS Headers
- Proper CORS headers for API endpoints
- Allows requests from the same origin

## File Structure
```
navik-website-main/
├── api/
│   ├── login.php
│   ├── logout.php
│   ├── register.php
│   ├── profile.php
│   └── test_results.php
├── config/
│   └── database.php
├── setup_database.php
└── [other website files]
```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check if MySQL is running in XAMPP
   - Verify database credentials in `config/database.php`
   - Ensure MySQL port 3306 is not blocked

2. **Permission Denied**
   - Check file permissions
   - Ensure web server has read/write access

3. **API Not Responding**
   - Check Apache is running
   - Verify PHP is enabled
   - Check error logs in XAMPP

### Error Logs
- XAMPP Error Log: `xampp/apache/logs/error.log`
- PHP Error Log: `xampp/php/logs/php_error_log`

## Testing

### Test Registration
1. Go to signup page
2. Fill out the form
3. Check if user is created in database

### Test Login
1. Use registered credentials
2. Check if session is created
3. Verify redirect to dashboard

### Test Logout
1. Click logout button
2. Verify session is destroyed
3. Check redirect to login page

## Production Deployment

### Security Considerations
1. Change default database credentials
2. Use HTTPS in production
3. Implement rate limiting
4. Add CSRF protection
5. Regular security updates

### Performance Optimization
1. Enable MySQL query caching
2. Use connection pooling
3. Implement proper indexing
4. Regular database maintenance

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review error logs
3. Verify all prerequisites are met
4. Ensure proper file permissions

---

**Note:** This backend is designed for the Navik Career Guidance Platform and includes user management, test result storage, and session management features.
