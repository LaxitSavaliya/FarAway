const User = require('../models/user');

// Username availability check (AJAX)
module.exports.checkUsername = async (req, res) => {
    const { username } = req.query;
    const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
    if (!username || !usernameRegex.test(username)) {
        return res.json({ available: false, reason: "Invalid format (3-15 alphanumeric or underscore)" });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.json({ available: false, reason: "Taken" });
    }
    res.json({ available: true });
};

// Email availability check (AJAX)
module.exports.checkEmail = async (req, res) => {
    const { email } = req.query;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.json({ available: false, reason: "Invalid email format" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.json({ available: false, reason: "Taken" });
    }
    res.json({ available: true });
};

// Render signup form
module.exports.renderSignup = (req, res) => {
    res.render('users/signup.ejs');
};

// Signup logic
module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        username = username.trim();
        email = email.trim();
        // Check for existing email/username
        const [existingEmail, existingUsername] = await Promise.all([
            User.findOne({ email }),
            User.findOne({ username })
        ]);
        if (existingEmail) {
            req.flash('error', 'Email already in use');
            return res.redirect('/signup');
        }
        if (existingUsername) {
            req.flash('error', 'Username already in use');
            return res.redirect('/signup');
        }
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        req.login(registerUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Homeaway');
            res.redirect('/listings');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
};

// Render login form
module.exports.renderLoginForm = (req, res) => {
    res.render('users/login.ejs');
};

// Login logic
module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back to Homeaway! You are logged in!');
    let redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
};

// Logout logic (POST preferred, GET for legacy)
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success', 'You have been logged out!');
        res.redirect('/listings');
    });
};