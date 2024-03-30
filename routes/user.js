const {Router} = require('express');

const User = require('../models/user');

const router = Router();

router.get('/signin', (req, res) => {
    return res.render('signin');
});

router.get('/signup', (req, res) => {
    return res.render('signup');
});

router.post('/signup', async (req, res) => {
    const {name, email, password} = req.body;

    await User.create({name, email, password});

    return res.redirect('/');
});

router.post('/signin', async (req, res) => {

    try {
        const {email, password} = req.body;
        const token = await User.matchPasswordAndGenerateToken(email, password);
        console.log("token",token);
    
        return res.cookie('token', token).redirect('/');
    } catch (error) {
        return res.render('signin', {error: "Incorrect Email or Password"});
    }
});

router.get('/logout', function(req, res) {
    res.clearCookie('token');
    return res.redirect('/');
});








module.exports = router;