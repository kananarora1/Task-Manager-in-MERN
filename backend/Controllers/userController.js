const User  = require('../Models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.registerUser = async (req, res) => {
    try {
        const userExists = await User.findOne({ where: { email: req.body.email } });
        if (userExists) {
            return res.status(400).json({ message: "User with that email already exists" });
        }
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword
        });

        const token = jwt.sign({ userId: newUser.id }, process.env.secret_key_jwt, { expiresIn: '7d' });
        res.status(201).json({
            success: true,
            message: 'User created',
            userId: newUser.id,
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Not able to create user " + error });
    }
}


exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist. Please register."
            });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid password."
            });
        }

        const token = jwt.sign({ userId: user.id }, process.env.secret_key_jwt, { expiresIn: '7d' });
        res.send({
            success: true,
            message: "You've successfully logged in!",
            token: token,
          });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "An error occurred during login.",
            error: error.message
          });
          
    }
};




exports.getCurrentUser = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(400).json({ message: "User not authenticated" });
        }

        const user = await User.findByPk(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Not able to fetch user " + error.message });
    }
};
