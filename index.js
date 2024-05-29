const express = require('express');
const app = new express();
const expressSession = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const ejs = require('ejs');
const DriveTest = require('./models/drivetest');
const Appointment = require('./models/appointment');
const g_pagecontroller = require('./controller/g_page');
const g2_pagecontroller = require('./controller/g2_page');
const dashboadcontroller = require('./controller/dashboard');
const signupcontroller = require('./controller/signup');
const loginUserPostcontroller = require('./controller/loginUser');
const homecontroller = require('./controller/home');
const updatecontroller = require('./controller/update');
const storedetailscontroller = require('./controller/storedetails');
const loginMiddleware = require('./middleware/loginMiddleware');
const validateMiddleware = require('./middleware/validateMiddleware');
const logingetcontroller = require('./controller/login');
const logoutcontroller = require('./controller/logout');
const appointmentcontroller = require('./controller/appointment');
const examinercontroller = require('./controller/examiner');
const adminMiddleware = require('./middleware/adminMiddleware');
const examinerMiddleware = require('./middleware/examinerMiddleware');
const storeappointmentdetailscontroller = require('./controller/storeappointment');
const updateexaminercontroller = require('./controller/updateexaminer');
const testresultcontroller = require('./controller/testresultcontroller');

require('dotenv').config();
const uri = process.env.URI;
app.engine('ejs', require('ejs').__express);

app.set('view engine', 'ejs');
app.use(express.static('public'));
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  expressSession({
    secret: 'my-secret',
    cookie: { maxAge: 500000 },
    saveUninitialized: false,
    resave: false, // Add this line
  })
);
app.use(flash());

mongoose.connect(uri, { useNewUrlParser: true });

const validateMidlleWare = (req, res, next) => {
  console.log('validatemiddlewarereq', req);
  {
    return res.redirect('/G2');
  }

  next(); // Continue to the next middleware or route handler
};

app.post('/drivetest/store', storedetailscontroller);

app.post('/posts/signupUser', signupcontroller);
app.post('/posts/loginUser', loginUserPostcontroller);
// appointment post
app.post('/appointmentdata/store', storeappointmentdetailscontroller);

app.post('/updateExaminer', updateexaminercontroller);
app.post('/update', updatecontroller);
app.get('/', homecontroller);

app.get('/dashboard', dashboadcontroller);

app.get('/login', logingetcontroller);
app.get('/G2', loginMiddleware, g2_pagecontroller);
app.get('/G', loginMiddleware, g_pagecontroller);
app.get('/appointment', adminMiddleware, appointmentcontroller);
app.get('/examiner', examinerMiddleware, examinercontroller);
app.get('/getdriverresult', testresultcontroller);

app.get('/logout', logoutcontroller);
app.get('/examiner', examinercontroller);

let port = process.env.PORT;
if (port == null || port == '') {
  port = 4000;
}
app.listen(port, () => {
  console.log('App listening...');
});
