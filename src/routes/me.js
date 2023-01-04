const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/showlog', meController.showlog);
router.get('/stored/passwords', meController.storedPasswords);
router.get('/trash/passwords', meController.trashPasswords);

module.exports = router;
