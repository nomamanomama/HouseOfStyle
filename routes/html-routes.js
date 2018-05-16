// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var goTo = require('../controllers/routes.js');

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.
  //When users visit the page or go home
  app.get('/', goTo.home);


  // Customers sign-up/log-in

  app.get('/home/customer', goTo.customer);


  // schedule route loads schedule.handlebar view
  app.get("/providers/schedule", goTo.schedule);

  app.get('/home/customer/:firstName/:lastName',isLoggedIn, goTo.loggedIn);


  // schedule route loads schedule.handlebar view
  app.get("/customer/schedule",isLoggedIn, goTo.schedule);


  // about route loads about.handlebar view
  app.get("/about", goTo.about);

  // about provider loads provider.handlebar view 
  app.get("/provider", goTo.provider);

  // service route loads service.handlebar view
  app.get("/service", goTo.service);

  app.get("/api/stylist/:id", goTo.stylist);


  app.get("/bookings", goTo.bookings);

  function isLoggedIn(req, res, next) {
 
    if (req.isAuthenticated())

        return next();

    res.redirect('/');

}
};
