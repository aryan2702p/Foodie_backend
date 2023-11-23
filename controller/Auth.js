const { User } = require('../model/User');
const crypto = require('crypto');
const { sanitizeUser } = require('../services/common');
const SECRET_KEY = 'SECRET_KEY';
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  console.log('here')
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      'sha256',
      async function (err, hashedPassword) {
        console.log('here')
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const doc = await user.save();

        req.login(sanitizeUser(doc), (err) => {  // this also calls serializer and adds to session
          if (err) {
            res.status(400).json(err);
          } else {
            const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);
            res.status(201).json(token);
          }
        });
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};



exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    
    if (!user) {
      res.status(401).json({ message: 'No such user email' });
    } else {
      // Hash the user input password
      crypto.pbkdf2(
        req.body.password,
        user.salt,
        310000,
        32,
        'sha256',
        async function (err, hashedPassword) {
          if (err) {
            console.error('Error hashing password:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
          }

          // Compare the hashed passwords
          if (crypto.timingSafeEqual(user.password, hashedPassword)) {
            // TODO: We will make addresses independent of login
            res.status(200).json({ id: user.id, role: user.role });
          } else {
            res.status(401).json({ message: 'Invalid credentials' });
          }
        }
      );
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(400).json({ message: 'Bad request' });
  }
};

exports.checkUser = async (req, res) => {
  res.json({status:'success',user: req.user});
};