var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var User = mongoose.model('Admin');

module.exports = function(app, dirName){
  app.post('/login', function(req, res, next){
    if(!req.body.username || !req.body.password){
      return res.status(400).json({message: 'Please fill out all fields'});
    }

    passport.authenticate('local', function(err, user, info){
      if(err){ return next(err); }

      if(user){
        return res.json({token: user.generateJWT()});
      } else {
        return res.status(401).json(info);
      }
    })(req, res, next);
  });

  app.get('/login',function(req,res){
    res.sendFile(dirName + '/server/views/index.html');
  });
};
