var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campgrounds"),
    seedDB          = require("./seeds"),
    Comment         = require("./models/comment"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    flash           = require('connect-flash'),           
    User            = require("./models/user");

    var session = require('express-session')
    var MemoryStore = require('memorystore')(session)
    

var commentRoutes = require('./routes/comment'),
    campgroundRoutes = require("./routes/campground"),
    indexRoutes     = require("./routes/index");
// seedDB(); //seed the db
// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb+srv://sreemanth:yelpcamp14@cluster0-grkol.mongodb.net/yelpcamp",{ useNewUrlParser: true, useUnifiedTopology: true  });

app.set("view engine","ejs")
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

//Passport Config
app.use(require("express-session")({
    secret: "Im the cutest dog",
    resave: false,
    saveUninitialized: true,
    cookie:{
    maxAge: 60000,
    store: new MemoryStore({
            checkPeriod: 60000 // prune expired entries every 24h
          }),
    }

    
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser= req.user;
    res.locals.error= req.flash("error");
    res.locals.success= req.flash("success");
    next();
})

    app.use("/campgrounds/:id/comments",commentRoutes);
    app.use("/campgrounds",campgroundRoutes);
    app.use(indexRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server has started at port "+process.env.PORT)
});