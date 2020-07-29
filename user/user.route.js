const express = require('express');
const router = express.Router();
const { signUpUser, login } = require("./user.controller")

/* GET home page. */
router.post('/', signUpUser);

router.post('/login', login)


module.exports = router;
