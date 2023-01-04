const Password = require('../models/Password');
const Log = require('../models/Log');
const Auto = require('../models/Auto');
const { mutipleMongooseToObject } = require('../../util/mongoose');

const { mongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/passwords
    storedPasswords(req, res, next) {
        Promise.all([Password.find({}), Password.countDocumentsDeleted(),Auto.findOne({})])
            .then(([passwords, deletedCount, autos]) =>
                res.render('me/stored-passwords', {
                    deletedCount,
                    passwords: mutipleMongooseToObject(passwords),
                    autos: mongooseToObject(autos),
                }),
            )
            .catch(next);
    }

    // [GET] /me/trash/passwords
    trashPasswords(req, res, next) {
        Password.findDeleted({})
            .then((passwords) =>
                res.render('me/trash-passwords', {
                    passwords: mutipleMongooseToObject(passwords),
                }),
            )
            .catch(next);
    }

    showlog(req, res, next) {
        Promise.all([Log.find({}), Log.countDocumentsDeleted()])
            .then(([logs, deletedCount]) =>
                res.render('me/showlog', {
                    deletedCount,
                    logs: mutipleMongooseToObject(logs),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
