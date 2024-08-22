const User  = require('../Models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(400).json({ message: "User with that email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        const newUser = new User(req.body);
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.secret_key_jwt, {
            expiresIn: '7d',
        });
        res.send({
            success: true,
            message: 'User created',
            userId: newUser._id,
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Not able to create user " + error });
    }
}



exports.loginUser = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        res.send({
          success: false,
          message: "User does not exist Please Register",
        });
      }
  
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
  
      if (!validPassword) {
        res.send({
          success: false,
          message: "Sorry, invalid password entered!",
        });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.secret_key_jwt, {
        expiresIn: "7d",
      });
  
      res.send({
        success: true,
        message: "You've successfully logged in!",
        token: token,
      });
    } catch (error) {
      console.error(error);
    }
  };