const express = require('express')
const app = express()
const port = 3000

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        if (username == 'emilia' && password == '1212') {
            return done(null, {username, password});
        }

        return done(null, false, {message: 'Incorrect details'});
    }
));

app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'hbs')

app.get('/', function (req, res) {
    res.send('Hello World! ' + JSON.stringify(req.user));
})

app.get('/login', function (req, res) {
    res.render('login');
})

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))