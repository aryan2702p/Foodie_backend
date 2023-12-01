const { User } = require('../model/User');
const crypto = require('crypto');


exports.createUser = async (req, res) => {
 
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    
    if (user) {
      res.status(401).json({ message: 'email already registered' });
    } 
    else {
   
      const salt = crypto.randomBytes(16);
      crypto.pbkdf2(
        req.body.password,
        salt,
        310000,
        32,
        'sha256',
        async function (err, hashedPassword) {
          if (err) {
            console.error('Error hashing password:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
          }
          else{
            const user = new User({ ...req.body, password: hashedPassword, salt });
            const doc = await user.save();
            res.status(200).json({ id: user.id, role: user.role });
          }

         
        }
      );
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(400).json({ message: 'Bad request' });
  }
};



exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    
    if (!user) {
      res.status(401).json({ message: 'No such user email' });
    } else {
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

          if (crypto.timingSafeEqual(user.password, hashedPassword)) {
            res.status(200).json({ id: user.id, role: user.role ,points : user.points});
            console.log(user.id)
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