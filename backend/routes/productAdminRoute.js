const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const {isLoggedIn,admin} = require('../middleware/authMiddleWare');
const router = express.Router();

