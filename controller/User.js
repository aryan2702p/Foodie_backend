
const { User } = require('../model/User');

exports.fetchUserById = async (req, res) => {
  const { id } = req.params;
  //console.log("user-id: ",id)
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
    //console.log("user data: ",user)
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.fetchAllUsers = async (req, res) => {
  
  try {
    const users = await User.find({});
    const totalDocs = await User.countDocuments();
    res.set('X-Total-Count', totalDocs);
    res.status(200).json(users);
    // console.log(users)
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};