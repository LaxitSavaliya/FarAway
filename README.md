# 🌟 FarAway - Modern Listing & Review Platform

A full-stack web application for creating, managing, and reviewing listings with advanced features like image uploads, user authentication, and responsive design.

![FarAway](https://img.shields.io/badge/FarAway-Listing%20Platform-blue)
![Node.js](https://img.shields.io/badge/Node.js-16.0.0+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-orange)
![Express](https://img.shields.io/badge/Express-Framework-black)

## ✨ Features

### 🔐 Authentication & Security
- **User Registration & Login**: Secure authentication with Passport.js
- **Session Management**: Persistent sessions with MongoDB store
- **Password Security**: Bcrypt hashing for secure password storage

### 📝 Listing Management
- **CRUD Operations**: Create, Read, Update, Delete listings
- **Image Upload**: Cloudinary integration for image storage
- **Rich Content**: Detailed listing descriptions and metadata
- **Search & Filter**: Find listings easily
- **Responsive Design**: Works on all devices

### ⭐ Review System
- **User Reviews**: Authenticated users can leave reviews
- **Rating System**: Star-based rating mechanism
- **Review Management**: Edit and delete own reviews
- **Validation**: Input validation for all reviews

### 🎨 User Experience
- **Modern UI**: Clean, responsive design
- **Flash Messages**: User feedback for actions
- **Navigation**: Intuitive user navigation
- **Mobile Friendly**: Optimized for mobile devices

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js (>= 16.0.0)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with Local Strategy
- **Template Engine**: EJS with EJS-Mate
- **File Upload**: Multer with Cloudinary
- **Validation**: Joi schema validation

### Frontend
- **Styling**: Custom CSS with responsive design
- **JavaScript**: Vanilla JS for interactivity
- **Maps**: Mapbox integration (optional)
- **Icons**: Modern iconography

### Performance
- **Session**: Express-session with MongoDB store
- **Environment**: Environment-based configuration
- **Error Handling**: Comprehensive error management

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** (>= 16.0.0)
- **npm** (>= 8.0.0)
- **MongoDB** database (local or cloud)
- **Cloudinary** account for image storage
- **Mapbox** account (optional, for maps)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/LaxitSavaliya/FarAway
cd FarAway
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
```bash
cp env.example .env
```

Edit the `.env` file with your configuration:
```env
# Server Configuration
PORT=8080
NODE_ENV=development

# Database Configuration
DB_URL=mongodb://localhost:27017/faraway_db
# Atlas: mongodb+srv://username:password@cluster.mongodb.net/database_name

# Session Secret (generate a strong random string)
SECRET=your-super-secret-session-key-here

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_FOLDER=FarAway_DEV

# Mapbox Configuration (optional)
MAPBOX_TOKEN=your_mapbox_token_here

### 4. Start the Application

**Development Mode:**
```bash
npm run dev
```

**Direct Start:**
```bash
npm start
```

The application will be available at `http://localhost:8080`


## 📁 Project Structure

```
FarAway/
├── app.js                 # Main application entry point
├── cloudConfig.js         # Cloudinary configuration
├── middleware.js          # Custom middleware functions
├── schema.js             # Joi validation schemas
├── package.json          # Dependencies and scripts
├── env.example           # Environment variables template
├── README.md             # Project documentation
│
├── controllers/          # Route controllers
│   ├── listings.js      # Listing CRUD operations
│   ├── reviews.js       # Review management
│   └── users.js         # User authentication
│
├── models/              # Mongoose data models
│   ├── listing.js       # Listing schema
│   ├── review.js        # Review schema
│   └── user.js          # User schema
│
├── routes/              # Express routes
│   ├── listing.js       # Listing routes
│   ├── review.js        # Review routes
│   └── user.js          # User routes
│
├── views/               # EJS templates
│   ├── layouts/         # Layout templates
│   ├── includes/        # Reusable components
│   ├── listings/        # Listing pages
│   └── users/           # User pages
│
├── public/              # Static assets
│   ├── css/            # Stylesheets
│   └── js/             # Client-side JavaScript
│
├── utils/               # Utility functions
│   ├── expressError.js  # Error handling
│   └── wrapAsync.js     # Async wrapper
│
└── init/                # Initialization scripts
    ├── index.js         # Main init script
    └── data.js          # Sample data
```

## 🔌 API Endpoints

### Authentication
- `GET /signup` - User registration page
- `POST /signup` - Create new user account
- `GET /login` - User login page
- `POST /login` - Authenticate user
- `GET/POST /logout` - User logout

### Listings
- `GET /` - Redirect to listings
- `GET /listings` - View all listings
- `GET /listings/new` - Create new listing form
- `POST /listings` - Create new listing
- `GET /listings/:id` - View specific listing
- `GET /listings/:id/edit` - Edit listing form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews
- `POST /listings/:id/reviews` - Add review to listing
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

## 🔒 Security Features

- ✅ **Input Validation**: Joi schemas for all inputs
- ✅ **Session Security**: Secure, httpOnly cookies
- ✅ **Authentication**: Passport.js with secure password hashing
- ✅ **Authorization**: Role-based access control
- ✅ **SQL Injection Prevention**: MongoDB with parameterized queries

## 🧪 Testing & Quality

```bash
# Run security audit
npm run security-check

# Run linter (when configured)
npm run lint

# Start development server
npm run dev
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow the existing code style
- Add appropriate comments
- Test your changes thoroughly
- Update documentation if needed

## 📝 License

This project is for educational/demo purposes only.

### Common Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check your database URL in `.env`
- Verify network connectivity

**Cloudinary Upload Issues:**
- Verify your Cloudinary credentials
- Check file size limits
- Ensure proper file formats

**Session Issues:**
- Clear browser cookies
- Check session secret configuration
- Verify MongoDB connection

### Getting Help

- 📖 **Documentation**: Check this README
- 🐛 **Issues**: Open an issue on GitHub
- 💬 **Discussions**: Use GitHub Discussions
- 📧 **Contact**: Reach out to the maintainers

## 🙏 Acknowledgments

- **Express.js** team for the amazing framework
- **MongoDB** for the flexible database
- **Cloudinary** for image hosting
- **Passport.js** for authentication
- **EJS** for templating

---

**Made with ❤️ by Laxit Savaliya**

*Star this repository if you found it helpful!* 