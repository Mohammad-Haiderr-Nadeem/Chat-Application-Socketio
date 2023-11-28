/* eslint-disable semi */
const express = require('express');
const {
  addUser,
  registerUser,
  getUser,
  verifyHashForge,
  verifyHashArgon,
  verifyHashCrypto,
  verifyHashBcrypt,
  generateHashArgon,
  generateHashBcrypt,
  generateHashCrypto,
  generateHashForge
} = require('../Controllers/Users');

const router = express.Router();

router.post('/loginUser', addUser);
router.post('/signupUser', registerUser);
router.post('/validateHashForge', verifyHashForge);
router.post('/validateHashArgon', verifyHashArgon);
router.post('/validateHashCrypto', verifyHashCrypto);
router.post('/validateHashBcrypt', verifyHashBcrypt);
router.post('/generateHashForge', generateHashForge);
router.post('/generateHashArgon', generateHashArgon);
router.post('/generateHashCrypto', generateHashCrypto);
router.post('/generateHashBcrypt', generateHashBcrypt);
router.get('/getUser', getUser);

module.exports = router;
