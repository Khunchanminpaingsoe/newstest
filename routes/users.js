const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const passport = require('passport');
const router = express.Router();
//const { ensureAuthenticated } = require('../config/auth');

router.get('/', (req, res) => res.render('welcome'));


router.get('/auth/login', (req, res) => res.render('login'));

router.get('/auth/register', (req, res) => res.render('register'));

router.post('/auth/register', (req, res) => {
    const {name, email, password, password2} = req.body;
    let errors = [];

    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please fill all fields'});
    }
    if(password !== password2){
        errors.push({msg: 'Password do not match'});
    }
    if(password.length < 6){
        errors.push({msg: 'Password at least 6 characters'});
    }
    if(errors.length > 0){
        res.render('register', {
            errors, name, email, password, password2
        });
    }else {
        User.findOne({email: email})
        .then((user) => {
            if(user){
                errors.push({msg: 'Email already exists'});
                res.render('register', {
                    errors, name, email, password, password2
                });
            }else{
                const user = new User({
                    name,email,password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if(err => console.log(err));
                        user.password = hash;
                        user.save()
                        .then(user => {
                            req.flash('success_msg', 'You are now register and login');
                            res.redirect('/auth/login');
                        })
                        .catch(err => console.log(err));

                    })
                })
            }
        })
    }
})

router.post('/auth/login', (req, res, next) => {
    passport.authenticate( 'local', {
        successRedirect: '/home/homenewspage',
        failureRedirect: '/auth/login',
        failureFlash: true
 })(req, res, next);
});

router.get('/auth/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');

});


module.exports = router;