const express = require('express');
const check = require('./check');
const login = require('./login');
const redirect = require('./redirect');

const router = express.Router();

router.use('/check', check); // GET or POST
router.get('/redirect', redirect);
router.post('/login', login);