var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var session = require('express-session')
var FileStore = require('session-file-store')(session)

var flash = require('connect-flash');

var db = require('./lib/db');

app.use(bodyParser.urlencoded({
    extended: false
}));

// app.disable('x-powered-by');
app.use(express.static('public'));

app.use(compression());
app.use(session({
    secret: 'asadlfkj!@#!@#dfgasdg',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}))

app.use(flash());

// var authData = {
//     email: 'kirin2211@naver.com',
//     password: 'tjehddnjs14',
//     nickname: 'Tuna'
// };

// var passport = require('passport'),
//     LocalStrategy = require('passport-local').Strategy;

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function (user, done) {
//     // done(null, user.id);
//     console.log('serializeUser', user);
//     done(null, user.email);
// });

// passport.deserializeUser(function (id, done) {
//     // User.findById(id, function(err, user) {
//     //   done(err, user);
//     // });
//     console.log('deserializeUser', id);
//     done(null, authData);
// });

// app.post('/login_process',
//     passport.authenticate('local', {
//         failureRedirect: '/login'
//     }
//     )
//     ,function (request,response){
//         request.session.save(function(){
//             response.redirect('/');
//         })
//     }
//     );



// passport.use(new LocalStrategy(
//     {
//         usernameField: 'email',
//         passwordField: 'password'
//     },
//     function (username, password, done) {
//         console.log('LocalStrategy', username, password);
//         if (username === authData.email) {
//             console.log(1);
//             if (password === authData.password) {
//                 console.log(2);
//                 return done(null, authData);
//             } else {
//                 console.log(3);
//                 return done(null, false, {
//                     message: 'Incorrect password.'
//                 });
//             }
//         } else {
//             console.log(4);
//             return done(null, false, {
//                 message: 'Incorrect username.'
//             });
//         }
//     }
// ));

// app.post('/login_process',
//     passport.authenticate('local', {
//         successRedirect: '/',
//         failureRedirect: '/login'
//     }));

var passport = require('./lib/passport')(app);


// app.get('*', function (request, response, next) {
//     fs.readdir('./data', function (error, filelist) {
//         request.list = filelist;
//         next();
//     });
// });

app.get('*', function (request, response, next) {
    request.list = db.get('topics').value();
    next();
});

app.use('/static', express.static('static'));

var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');
// var authRouter = require('./routes/auth');
var authRouter = require('./routes/auth')(passport);


app.use('/', indexRouter);
app.use('/', topicRouter);
app.use('/', authRouter);

app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});