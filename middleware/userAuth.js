const db = require('../models/dbCon');

const User = db.userModel;


const saveUser = async (req, res, next) => {
  try {
    const userName = await User.findOne({
      where: {
        userName: req.body.userName,
      }
    });
    if (userName) {
      return res.status(400).send('userName already exists');
    }

  } catch (err) {
    console.log(err);
  }
  next();
};

module.exports = {
  saveUser,
}