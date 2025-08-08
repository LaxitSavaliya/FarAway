const User = require('../models/user');

module.exports.checkUsername = async (req, res) => {
    const { username } = req.query;
    if (!username || username.length < 3 || username.length > 15) {
        return res.json({ available: false, reason: "Username must be 3-15 characters" });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.json({ available: false, reason: "Username already taken" });
    }
    res.json({ available: true });
};

module.exports.checkEmail = async (req, res) => {
    const { email } = req.query;
    if (!email || !email.includes('@')) {
        return res.json({ available: false, reason: "Invalid email format" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.json({ available: false, reason: "Email already taken" });
    }
    res.json({ available: true });
};

module.exports.renderSignup = (req, res) => {
    if (req.user) {
        req.flash("success", 'You are already logged in')
        res.redirect('/listings')
    } else {
        res.render('users/signup.ejs');
    }
};

module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        username = username.trim();
        email = email.trim();

        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        req.login(registerUser, (err) => {
            if (err) return next(err);
            console.log('Signup successful for user:', registerUser.username);
            req.flash('success', 'Welcome to FarAway!');
            res.redirect('/listings');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
};

module.exports.renderLoginForm = (req, res) => {
    if (req.user) {
        req.flash("success", 'You are already logged in')
        res.redirect('/listings')
    } else {
        res.render('users/login.ejs');
    }
};

module.exports.login = (req, res) => {
    console.log('Login successful for user:', req.user.username);
    req.flash('success', 'Welcome back to FarAway! You are logged in!');
    let redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success', 'You have been logged out!');
        res.redirect('/listings');
    });
};