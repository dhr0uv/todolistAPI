const db = require('../models/dbCon');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = db.userModel;


const createUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const data = {
      userName,
      password: await bcrypt.hash(password, 10),
    }
    const user = await User.create(data);
    if (user) {
      return res.status(201).send('Registered successfully');
    } else {
      return res.status(409).send('Invalid Credentials');
    }
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({
      where: {
        userName: userName,
      }
    });
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.secretKey, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });
        console.log(token);
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        return res.status(201).send({
          userName: userName,
          token: token
        });
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }

  } catch (err) {
    console.log(err);
  }
}


module.exports = {
  createUser,
  loginUser,
}