/* eslint-disable semi */
const bcrypt = require('bcrypt');
const argon2 = require('argon2');
const forge = require('node-forge');
const jwt = require('jsonwebtoken');
const modal = require('../models');
const CryptoJS = require('crypto-js');

const key = forge.random.getBytesSync(16);
const iv = forge.random.getBytesSync(16);

// const addUser = async (req, res) => {
//   try {
//     const { email, password } = await req.body;
//     if (email && password) {
//       const user = await modal.NewUsers.findOne({ where: { email } });
//       if (user) {
//         // const match = await bcrypt.compare(password, user.password);
//         const match = await argon2.verify(user.password, password);
//         if (match) {
//           const token = jwt.sign({ email }, 'secret-key', { expiresIn: '1h' });
//           const name = user.name;
//           return res.json({ token, name, user });
//         } else {
//           return res.status(400).json({ msg: 'INVALID_PASSWORD' });
//         }
//       } else {
//         return res.status(400).json({ msg: 'INVALID_EMAIL' });
//       }
//     } else {
//       return res.status(400).json({ msg: 'EMPTY' });
//     }
//   } catch (err) {
//     return res.status(400).json(err);
//   }
// };

const addUser = async (req, res) => {
  try {
    const { email, password } = await req.body;
    if (email && password) {
      const user = await modal.NewUsers.findOne({ where: { email } });
      if (user) {
        const token = jwt.sign({ email }, 'secret-key', { expiresIn: '1h' });
        const name = user.name;
        return res.json({ token, name, user });
      } else {
        return res.status(400).json({ msg: 'INVALID_EMAIL' });
      }
    } else {
      return res.status(400).json({ msg: 'EMPTY' });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = await req.body;
    if (name && email && password) {
      try {
        // const hash = await argon2.hash(password);
        // const hash = CryptoJS.AES.encrypt(password, 'secret key 123 abcd').toString();
        const cipher = forge.cipher.createCipher('AES-CBC', key);
        cipher.start({ iv });
        cipher.update(forge.util.createBuffer(password, 'utf8'));
        cipher.finish();
        const hash = cipher.output.getBytes();
        const user = await modal.NewUsers.create({
          name,
          email,
          password: hash
        });
        return res.json({ user });
        // bcrypt
        //   .hash(password, 10)
        //   .then(async (hash) => {
        //     const user = await modal.NewUsers.create({
        //       name,
        //       email,
        //       password: hash
        //     });
        //     return res.json({ user });
        //   })
        //   .catch((err) => console.log('error in hash: ', err));
      } catch (err) {
        console.log('err adding user: ', err);
        return res.status(400).json(err);
      }
    } else {
      return res.status(400).json({
        msg: 'name, email or password is empty'
      });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getUser = async (req, res) => {
  try {
    const { name } = req.query;
    const user = await modal.NewUsers.findOne({ where: { name } });
    if (user) {
      return res.json({ name });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

// const verifyHash = async (req, res) => {
//   try {
//     const { hash, myPassword } = await req.body;
//     const match = await argon2.verify(hash, myPassword);
//     if (match) {
//       return res.status(200).json({ msg: 'SUCCESSFUL' });
//     } else {
//       return res.status(400).json({ msg: 'UNSUCCESSFUL' });
//     }
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };

const verifyHashForge = async (req, res) => {
  try {
    const { hash, myPassword } = await req.body;
    const decipher = forge.cipher.createDecipher('AES-CBC', key);
    decipher.start({ iv });
    decipher.update(forge.util.createBuffer(hash));
    decipher.finish();
    const password = decipher.output.toString('utf8');
    if (password === myPassword) {
      return res.status(200).json({ msg: 'SUCCESSFUL', password });
    } else {
      return res.status(400).json({ msg: 'UNSUCCESSFUL' });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const verifyHashArgon = async (req, res) => {
  try {
    const { hash, myPassword } = await req.body;
    const match = await argon2.verify(hash, myPassword);
    if (match) {
      return res.status(200).json({ msg: 'SUCCESSFUL' });
    } else {
      return res.status(400).json({ msg: 'UNSUCCESSFUL' });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const verifyHashCrypto = async (req, res) => {
  try {
    const { hash, myPassword } = await req.body;
    const bytes = CryptoJS.AES.decrypt(hash, 'secretkey123');
    const match = bytes.toString(CryptoJS.enc.Utf8);
    if (match === myPassword) {
      return res.status(200).json({ msg: 'SUCCESSFUL', match });
    } else {
      return res.status(400).json({ msg: 'UNSUCCESSFUL' });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const verifyHashBcrypt = async (req, res) => {
  try {
    const { hash, myPassword } = await req.body;
    const match = await bcrypt.compare(myPassword, hash);
    if (match) {
      return res.status(200).json({ msg: 'SUCCESSFUL' });
    } else {
      return res.status(400).json({ msg: 'UNSUCCESSFUL' });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const generateHashForge = async (req, res) => {
  try {
    const { text } = await req.body;
    const cipher = forge.cipher.createCipher('AES-CBC', key);
    cipher.start({ iv });
    cipher.update(forge.util.createBuffer(text));
    cipher.finish();
    const hash = cipher.output;
    return res.status(200).json({ msg: 'SUCCESSFUL', hash });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const generateHashArgon = async (req, res) => {
  try {
    const { text } = req.body;
    const hash = await argon2.hash(text);
    return res.status(200).json({ msg: 'SUCCESSFUL', hash });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const generateHashCrypto = async (req, res) => {
  try {
    const { text } = await req.body;
    const hash = CryptoJS.AES.encrypt(text, 'secretkey123').toString();
    return res.status(200).json({ msg: 'SUCCESSFUL', hash });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const generateHashBcrypt = async (req, res) => {
  try {
    const { text } = await req.body;
    bcrypt
      .hash(text, 10)
      .then(async (hash) => {
        return res.json({ hash });
      })
      .catch((err) => console.log('error in hash: ', err));
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
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
};
