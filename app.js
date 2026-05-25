if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

//create db

const dbUrl = process.env.ATLASDB_URL;
main()
.then(() =>{
    console.log("Connected to DB");
}).catch(err => { 
    console.log(err) 
});

async function main(){
     await mongoose.connect(dbUrl, { serverSelectionTimeoutMS: 5000 });
}

app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
    mongoUrl: process.env.ATLASDB_URL,
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("SESSION STORE ERROR:", err);
});

const sessionOptions = {
     store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false, 
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

// app.get("/", (req, res) =>{
//     res.send("Hi, I am root!");
// }); 

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

passport.use(new LocalStrategy(User.authenticate()));// use static authenticate method of model in LocalStrategy
passport.serializeUser(User.serializeUser());// use static serialize and deserialize of model for passport session support
passport.deserializeUser(User.deserializeUser());



// mDemo user
// app.get("/demoUser", async(req, res) =>{
//     let fakeUser = new User({
//         email: "Student@gmail.com",
//         username: "Sigma-Student2",
//     });

//     let registerUser = await User.register(fakeUser, "helloworld");
//     res.send(registerUser);
// });

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

//custom error handling
app.use((req, res, next) =>{
    next(new ExpressError(404, "Page Not found!"));
}); 

// Replace your current error handler in app.js with this:
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong!";
    
    if (statusCode === 500) {
        message = "Something went wrong! Please try again.";
    }
    res.status(statusCode).render("error.ejs", { message });
});
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});