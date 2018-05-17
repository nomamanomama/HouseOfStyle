//
// *************************************************************************************************
//                              controllers/rendering-controller.js  
//
//      THIS PAGE WILL HANDLE ANYTHING DEALING WITH GATHERING STATIC INFORMATION AND RENDERING 
//                              IT THROUGH TO THE HANDLEBARS
//
// *************************************************************************************************

var db = require("../models");
// Including the modules for Customers
var getCustomer = require('./customer.js');

//Including the modules for Services
var getService = require('./services.js')

//Including the modules for Providers
var getProviders = require("./provider.js");

//Including the modules for Appointments
var getAppointments = require('./appointments.js');

//Including the modules for Schedules
var getSchedules = require('./schedules.js')


var exports = module.exports = {};


//Sets viewBuilder as global so it can be access by all routes
var viewBuilder = {};

// This Function will handle logic for when users go to the path '/'
// This will figure out if there's a user already logged in by checking if(req.user) and redirect back to /home + the other params. If there's no user just redirect to /home
exports.Welcome = function(req,res, next){
    if(req.user){
        res.redirect('/home/' + req.user.userType + '/' + req.user.id)
    }else {
        res.redirect('/home');
    }
    
}


// This function will be the main function that buils the viewBuilder containing all the stuff we're going to need to render in views and will be created at the '/hjome' path
exports.home = function(req, res){
    //If there's no user logged in this will be the basic view builder
    viewBuilder = {
        LoggedIn : false,
        messageLogIn : req.flash('logInMessage'), 
        messageSignIn: req.flash('signUpMessage'),
        messagesettingsMessage: req.flash('settingsMessage'),
        admin: false
    };

    // If there is a user logged all of this will be added to viewBuilder
    if(req.user){
        viewBuilder.LoggedIn = true;
        viewBuilder.userId = req.user.id;
        viewBuilder.firstName = req.user.firstName;
        viewBuilder.lastName = req.user.lastName;
        viewBuilder.email = req.user.email;
        viewBuilder.phoneNumber = req.user.phone;
        viewBuilder.notes = req.user.notes;
        viewBuilder.photoLink = req.user.photoLink;
        viewBuilder.userType = req.user.userType;
        //Doing this to keep our site routing look clean 
        //If you have a new htmlRoute please build it here and in handlebars do a 'if LoggedIn statement' with the links
        viewBuilder.homeRoute = '/home/'+req.user.userType+'/'+req.user.id;
        viewBuilder.aboutRoute = '/about/'+req.user.userType+'/'+req.user.id;
        viewBuilder.scheduleRoute = '/schedule/'+req.user.userType+'/'+req.user.id;
        viewBuilder.updateRoute = "/update/" + req.user.userType + "/" + req.user.id

        //If a user is a Admin set the admin equal to true
        if(req.user.userType === 'admin'){
            viewBuilder.admin = true;
        }
    };

    // console.log(viewBuilder);

    res.render('home', viewBuilder);

}

// Handles for when user goes to the path '/about'
exports.about = function (req, res) {
    res.render('about', viewBuilder);
};




// Handles when users go to providers page!!!***THIS FUNCTION STILL NEEDS MORE INFORMATION TO BE GATHERED BEFORE IT CAN RENDER ALL STATIC INFORMATION ON THIS PAGE
exports.provider = function (req, res) {


    getCustomer.AllInfo(function(err,clients){
        console.log(clients);
        viewBuilder.Customers = clients;
        console.log(viewBuilder);
        res.render('provider', viewBuilder);
    });

   
};


// Handles when users go to services page!!!***THIS FUNCTION STILL NEEDS MORE INFORMATION TO BE GATHERED BEFORE IT CAN RENDER ALL STATIC INFORMATION ON THIS PAGE

exports.service = function (req, res) {

    //
    //This is were we get all services information
    //
    getService.AllServices(function(err,services){

        console.log(services);
        viewBuilder.Services = services;
        
        res.render('service', viewBuilder)
    })
    

};






exports.bookings = function (req, res) {
    db.Appointments.findAll({
        // include: [db.Providers]
    }).then(function (dbBooking) {
        console.log(dbBooking);
        //Not sure what this is supposed to render
        res.render('schedule', viewBuilder);
    });
  
};






exports.schedule = function (req, res) {
    db.Schedules.findAll({
        include: [db.Providers]
    }).then(function (dbProvider) {
        console.log(dbProvider);
        res.render('schedule', viewBuilder);
    });
  
};


exports.stylist = function (req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Providers.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Services]
    }).then(function (dbstylist) {
        console.log(dbstylist);
        console.log(services[0]);
        //Not sure what this is supposed to render
        res.redirect(req.currentUrl)
    });
};
