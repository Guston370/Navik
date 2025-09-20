# Navik Career Guidance Platform - Node.js Backend

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **MySQL** (v5.7 or higher)
- **XAMPP** (for MySQL) or standalone MySQL server

### Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start MySQL**
   - Open XAMPP Control Panel
   - Start **MySQL** service
   - Ensure MySQL is running on port 3306

3. **Setup Database**
   ```bash
   npm run setup
   ```
   Or visit: `http://localhost:3000/api/setup`

4. **Start Server**
   ```bash
   npm start
   ```
   For development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Access Application**
   - **Main App**: http://localhost:3000
   - **API Health**: http://localhost:3000/api/health
   - **Database Setup**: http://localhost:3000/api/setup

## 📁 Project Structure

```
navik-website-main/
├── server.js                 # Main Express server
├── package.json              # Dependencies and scripts
├── setup_database.js         # Database setup script
├── env.example              # Environment variables template
├── config/
│   └── database.js          # Database connection and configuration
├── routes/
│   ├── auth.js              # Authentication routes (login, register, logout)
│   ├── users.js             # User management routes
│   └── tests.js             # Test results routes
└── [existing frontend files]
```

## 🔧 API Endpoints

### Authentication
- **POST** `/api/auth/register` - User registration
- **POST** `/api/auth/login` - User login
- **POST** `/api/auth/logout` - User logout
- **GET** `/api/auth/status` - Check authentication status

### User Management
- **GET** `/api/users/profile` - Get user profile
- **PUT** `/api/users/profile` - Update user profile
- **GET** `/api/users/stats` - Get user statistics

### Test Results
- **GET** `/api/tests/results` - Get all test results
- **POST** `/api/tests/results` - Save test results
- **GET** `/api/tests/results/:testType` - Get specific test result
- **GET** `/api/tests/stats` - Get test statistics
- **DELETE** `/api/tests/results/:testType` - Delete test result

### System
- **GET** `/api/health` - Health check
- **GET** `/api/setup` - Database setup

## 🗄️ Database Schema

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

## 🔐 Security Features

### Password Security
- **bcryptjs** for password hashing
- Minimum 6 character password requirement
- Salt rounds: 10 (configurable)

### Session Management
- **express-session** for server-side sessions
- Secure session cookies
- Session cleanup on logout

### Input Validation
- **Joi** for request validation
- SQL injection prevention with prepared statements
- XSS protection

### Rate Limiting
- 100 requests per 15 minutes per IP
- Configurable rate limits

### CORS Protection
- Configurable allowed origins
- Credentials support for sessions

## 📝 Usage Examples

### User Registration
```javascript
const response = await fetch('/api/auth/register', {
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
const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include', // Important for sessions
    body: JSON.stringify({
        username: 'john_doe',
        password: 'password123'
    })
});
```

### Save Test Results
```javascript
const response = await fetch('/api/tests/results', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
        test_type: 'numerical',
        score: 12,
        total_questions: 15,
        answers: { /* user answers */ }
    })
});
```

## ⚙️ Environment Configuration

Create a `.env` file (copy from `env.example`):

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=navik_career_guidance

# Server Configuration
PORT=3000
NODE_ENV=development

# Session Configuration
SESSION_SECRET=your-super-secret-key-here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

## 🧪 Testing

### Test Registration
1. Visit: http://localhost:3000/signup
2. Fill out registration form
3. Check database for new user

### Test Login
1. Visit: http://localhost:3000
2. Use registered credentials
3. Verify redirect to dashboard

### Test API Endpoints
```bash
# Health check
curl http://localhost:3000/api/health

# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'
```

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   ```bash
   # Check MySQL status
   mysql -u root -p -e "SELECT 1"
   
   # Verify database exists
   mysql -u root -p -e "SHOW DATABASES"
   ```

2. **Port Already in Use**
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   
   # Or change port in .env file
   PORT=3001
   ```

3. **Session Issues**
   - Ensure `credentials: 'include'` in fetch requests
   - Check CORS configuration
   - Verify session secret is set

4. **Module Not Found**
   ```bash
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

### Error Logs
- Server logs: Console output
- Database logs: MySQL error log
- Session logs: Check browser developer tools

## 🔄 Migration from PHP

### Changes Made
1. **API Endpoints**: Changed from `/api/*.php` to `/api/*`
2. **Session Management**: Now uses Express sessions instead of PHP sessions
3. **Database**: Uses mysql2 instead of PDO
4. **Validation**: Uses Joi instead of manual validation

### Frontend Updates
- Updated fetch URLs to use Node.js endpoints
- Added `credentials: 'include'` for session support
- Removed PHP-specific code

## 🚀 Production Deployment

### Security Checklist
- [ ] Change default session secret
- [ ] Use HTTPS in production
- [ ] Set secure database credentials
- [ ] Enable helmet security headers
- [ ] Configure proper CORS origins
- [ ] Set up rate limiting
- [ ] Enable MySQL SSL

### Performance Optimization
- [ ] Use connection pooling
- [ ] Enable MySQL query cache
- [ ] Add Redis for session storage
- [ ] Implement API caching
- [ ] Use PM2 for process management

### Environment Setup
```bash
# Production environment
NODE_ENV=production
PORT=3000
DB_HOST=your-production-db-host
DB_USER=your-production-db-user
DB_PASSWORD=your-secure-password
SESSION_SECRET=your-super-secure-session-secret
```

## 📞 Support

### Sample Admin Account
- **Username**: `admin`
- **Password**: `admin123`

### Default Configuration
- **Server Port**: 3000
- **Database**: navik_career_guidance
- **Session Duration**: 24 hours

---

**🎯 Your Navik Career Guidance Platform is now powered by Node.js with Express.js!**
