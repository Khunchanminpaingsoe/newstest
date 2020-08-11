const localStrtegy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const user = require('../models/user');

module.exports = function( passport ) {
    passport.use(
        new localStrtegy({ usernameField: 'email' }, (email, password, done) => {
            user.findOne({ email: email })
            .then(user => {
                if(!user){
                    return done(null, false, {message: 'This email is not register'});
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;
                    if(isMatch){
                        return done(null, user)
                    }else{
                        return done(null, false, {message: 'Password incorrect'});
                    }
                })
            })
            .catch(err => console.log(err));
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        user.findById(id, (err, user) => {
            done(err, user);
        });
    });

}
