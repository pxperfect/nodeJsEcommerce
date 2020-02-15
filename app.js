// Express framework and body parser lib.
const express = require('express');
const bodyParser = require('body-parser');

// Databbase
// const mongodb = require('mongodb');
const mongoose = require('mongoose');


// Models.
const User = require('./models/user');

// Services.
const userService = require('./services/UserService');

// Routes.
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const errorController = require('./controllers/errorPage');

// Additional.
const path = require('path');
const logError = require('./utils/errorLoger');

// App.
const app = express();

// Static files.
const staticFilesPath = path.join(__dirname, 'public');
app.use(express.static(staticFilesPath));

// Set templating engine.
app.set('view engine', 'ejs');
app.set('views', 'views');

// Parse body.
app.use(bodyParser.urlencoded({extended: true}));

// Create/get user.
app.use(async (req, res, next) => {
    const user = await userService.findById('5e45af47b501380d05656b88');
    // const user = new User('admin', 'admin@nodeshop.com');
    // await userService.save(user);
    // console.info(user);
    if (user) {
        req.user = user;
        next();
    }
});

// App routes.
app.use('/admin', adminRoutes);
app.use(shopRoutes);
// app.use(errorController.get404page);

async function checkUser(userId) {

}

const runServer = async () => {
    try {
        await mongoose.connect('mongodb+srv://marcin:marcin@nodeapp-j9xgz.mongodb.net/project?retryWrites=true&w=majority');
        app.listen(3000);
    } catch (e) { logError(e, 'app.js', 'syncDatabase') }
};
runServer();