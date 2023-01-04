const Password = require('../models/Password');
const Log = require('../models/Log');
const Auto = require('../models/Auto');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');

var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://io.adafruit.com/api/v2/mp5navy/feeds/sync/data?X-AIO-Key=aio_yNeR17nXpC9q6fmm4cWrEdR0qg4p',
  'headers': {
    'Accept': 'application/json',
    'Authorization': 'Basic PEJhc2ljIEF1dGggVXNlcm5hbWU+OjxCYXNpYyBBdXRoIFBhc3N3b3JkPg==',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "value": "1"
  })

};

var optionautoon = {
    'method': 'POST',
    'url': 'https://io.adafruit.com/api/v2/mp5navy/feeds/auto-mode/data?X-AIO-Key=aio_yNeR17nXpC9q6fmm4cWrEdR0qg4p',
    'headers': {
      'Accept': 'application/json',
      'Authorization': 'Basic PEJhc2ljIEF1dGggVXNlcm5hbWU+OjxCYXNpYyBBdXRoIFBhc3N3b3JkPg==',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "value": "1"
    })
  
  };

  var optionautooff = {
    'method': 'POST',
    'url': 'https://io.adafruit.com/api/v2/mp5navy/feeds/auto-mode/data?X-AIO-Key=aio_yNeR17nXpC9q6fmm4cWrEdR0qg4p',
    'headers': {
      'Accept': 'application/json',
      'Authorization': 'Basic PEJhc2ljIEF1dGggVXNlcm5hbWU+OjxCYXNpYyBBdXRoIFBhc3N3b3JkPg==',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "value": "0"
    })
  
  };

class PasswordController {
    // [GET] /Passwords/:slug
    show(req, res, next) {
        Password.findOne({ slug: req.params.slug })
            .then((password) =>
                res.render('me/getpassword', {
                    password: mongooseToObject(password),
                }),
            )
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('passwords/create');
    }

    getpass(req, res, next){
        Promise.all([Password.find({}), Password.countDocumentsDeleted()])
        .then(([passwords, deletedCount]) =>
            /*res.render('me/getpassword', {
                passwords: mutipleMongooseToObject(passwords),
            }),*/
            res.json({
                passwords: mutipleMongooseToObject(passwords),
            }),
        )
        .catch(next);
        /*res.json({
            number: 1
          });*/
    }

    sync(req, res, next){
        Promise.all([Password.find({}), Password.countDocumentsDeleted()])
        .then(([passwords, deletedCount]) =>
            res.redirect('/me/stored/passwords'),
            /*res.render('me/stored-passwords', {
                passwords: mutipleMongooseToObject(passwords),
            }),   */
            request(options, function (error, response) {
                if (error) throw new Error(error);
                console.log("Turn on Sync flag");
            }),
        )
        .catch(next);
    }

    autoon(req, res, next){

        Promise.all([Password.find({}), Password.countDocumentsDeleted()])
        .then(([passwords, deletedCount]) =>
            res.render('me/stored-passwords', {
                passwords: mutipleMongooseToObject(passwords),
            }),    
            request(optionautoon, function (error, response) {
                if (error) throw new Error(error);
                console.log("Turn on Auto flag");
            }),
        )
        .catch(next);
        Auto.updateOne({ _id: '6392f46a8b407ed1a5a0da40' }, {value:'ON'})
            .then(() => res.redirect('/me/stored/passwords'))
            .catch(next);
    }

    autooff(req, res, next){

        Promise.all([Password.find({}), Password.countDocumentsDeleted()])
        .then(([passwords, deletedCount]) =>
            res.render('me/stored-passwords', {
                passwords: mutipleMongooseToObject(passwords),
            }),    
            request(optionautooff, function (error, response) {
                if (error) throw new Error(error);
                console.log("Turn off Auto flag");
            }),
        )
        .catch(next);
        Auto.updateOne({ _id: '6392f46a8b407ed1a5a0da40' }, {value:'OFF'})
            .then(() => res.redirect('/me/stored/passwords'))
            .catch(next);
    }

    createlog(req, res, next) {
        res.render('passwords/createlog');
    }


    // [POST] /courses/store
    store(req, res, next) {
        console.log("store")
        const password = new Password(req.body);
        password
            .save()
            .then(() => res.redirect('/me/stored/passwords'))
            .catch((error) => {});

        //res.send('COURSE SAVED');
    }

    storelog(req, res, next) {
        console.log("log")
        const log = new Log(req.body);
        log
            .save()
            .then(() => res.redirect('/passwords/createlog'))
            .catch((error) => {});

        //res.send('COURSE SAVED');
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Password.findById(req.params.id)
            .then((password) =>
                res.render('passwords/edit', {
                    password: mongooseToObject(password),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Password.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/passwords'))
            .catch(next);
    }

    updateautomode(req, res, next) {
        console.log("auto mode")
        Auto.updateOne({ _id: '6392f46a8b407ed1a5a0da40' }, req.body)
            .then(() => res.redirect('/me/stored/passwords'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        Password.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Password.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Password.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new PasswordController();
