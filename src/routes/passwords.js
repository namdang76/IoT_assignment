const express = require('express');
const router = express.Router();

const passwordController = require('../app/controllers/PasswordsController');


router.post('/automode', passwordController.updateautomode);
router.post('/storelog', passwordController.storelog);
router.get('/createlog', passwordController.createlog);
router.get('/auto-on', passwordController.autoon);
router.get('/auto-off', passwordController.autooff);
router.get('/sync', passwordController.sync);
router.get('/getpass', passwordController.getpass);
router.get('/create', passwordController.create);
router.post('/store', passwordController.store);
router.get('/:id/edit', passwordController.edit);
router.put('/:id', passwordController.update);
router.patch('/:id/restore', passwordController.restore);
router.delete('/:id', passwordController.destroy);
router.delete('/:id/force', passwordController.forceDestroy);
router.get('/:slug', passwordController.show);

module.exports = router;
