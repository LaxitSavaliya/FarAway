# FarAway - Listing & Review Application

A production-ready web application for creating and managing listings with user reviews and ratings.

## 🚀 Features

- User authentication and authorization
- Create, edit, and delete listings
- Add reviews and ratings
- Image upload with Cloudinary
- Responsive design
- Security features (CSRF protection, rate limiting, helmet)

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js with Local Strategy
- **Template Engine**: EJS
- **File Upload**: Multer with Cloudinary
- **Security**: Helmet, CSRF, Rate Limiting
- **Validation**: Joi

## 📋 Prerequisites

- Node.js (>= 16.0.0)
- npm (>= 8.0.0)
- MongoDB database
- Cloudinary account

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd MAJORPROJECT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=3000
   NODE_ENV=development
   DB_URL=mongodb://localhost:27017/your_database_name
   SECRET=your-super-secret-session-key-here
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   CLOUDINARY_FOLDER=FarAway_DEV
   ```

4. **Start the application**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm run prod
   ```

## 🌐 Production Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/database_name
SECRET=your-very-long-random-secret-key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_FOLDER=FarAway_PROD
```

### Security Checklist

- [x] Helmet.js for security headers
- [x] CSRF protection enabled
- [x] Rate limiting implemented
- [x] Session security configured
- [x] Input validation with Joi
- [x] SQL injection prevention (MongoDB)
- [x] XSS protection
- [x] Secure cookie settings

### Deployment Platforms

#### Heroku
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git:
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

#### Railway
1. Connect your GitHub repository
2. Set environment variables in Railway dashboard
3. Deploy automatically

#### DigitalOcean App Platform
1. Connect your repository
2. Configure environment variables
3. Deploy

## 🔒 Security Features

- **Helmet.js**: Security headers
- **CSRF Protection**: Cross-site request forgery prevention
- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Joi schemas for all inputs
- **Session Security**: Secure, httpOnly cookies
- **Authentication**: Passport.js with secure password hashing
- **Authorization**: Role-based access control

## 📁 Project Structure

```
MAJORPROJECT/
├── app.js                 # Main application file
├── cloudConfig.js         # Cloudinary configuration
├── middleware.js          # Custom middleware
├── schema.js             # Joi validation schemas
├── controllers/          # Route controllers
├── models/              # Mongoose models
├── routes/              # Express routes
├── views/               # EJS templates
├── public/              # Static files
└── utils/               # Utility functions
```

## 🧪 Testing

```bash
# Run security audit
npm run security-check

# Run linter (when configured)
npm run lint
```

## 📝 API Endpoints

- `GET /` - Redirect to listings
- `GET /listings` - View all listings
- `POST /listings` - Create new listing
- `GET /listings/:id` - View specific listing
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing
- `POST /listings/:id/reviews` - Add review
- `DELETE /listings/:id/reviews/:reviewId` - Delete review
- `GET /signup` - Signup page
- `POST /signup` - Create account
- `GET /login` - Login page
- `POST /login` - Authenticate user
- `GET/POST /logout` - Logout user

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support, please open an issue in the GitHub repository. 