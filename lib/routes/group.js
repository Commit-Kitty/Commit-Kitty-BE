const { Router } = require('express');
const { ensureAuth, ensureAdminAuth } = require('../middleware/ensureAuth');
const Group = require('../models/Group');

module.exports = Router();
