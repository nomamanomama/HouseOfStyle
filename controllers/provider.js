// *************************************************************************************************
//                              controllers/provider-api-routes.js  
//      This file will contain all functions to retrieve any data retaining to the Providers model 
//                              and pass it back through a callback
//
//   This file will also contain the functions that deal with Provider intractions with the database
// *************************************************************************************************


//Importing our database
var db = require("../models");


var exports = module.exports = {};

  //This function will retrieve all Providers with their corresponding Services and pass it back through a callback
  exports.AllWithServices = function(cb){

  }

  //This function will retrieve all Providers with their corresponding Schedules and pass it back through a callback
  exports.AllWithSchedules = function(cb){

  }

  // This function will take a data object as an arugment to update Provider information and pass back through a callback if it failed or succeeded
  exports.update = function(data,cb){

  }

  // This function will take a data object as an arugment to create a new Provider and pass back through a callback if it failed or succeeded

  exports.newProvider = function(data,cb){
    
  }