import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// User registration
export const register = async (req, res) => {
    try {
        // Hashing password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo,
            role: req.body.role || 'user',  // Assuming role is provided in the request body or default to 'user'
        });

        await newUser.save();
        res.status(200).json({ success: true, message: 'Successfully created' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create' });
    }
};

// Token creation function
const createtoken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, { expiresIn: '15d' });
};

// User login
export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: "Email not found",
                status: "404 Not Found",
            });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid password",
                status: "400 Bad Request",
            });
        }

        const token = createtoken(user._id, user.role);

        res.status(200).json({
            username: user.username,
            email: user.email,
            _id: user._id, // Include the user ID in the response
            token: token,
            role: user.role,
        });
    } catch (error) {
        res.status(500).json({
            status: "500 Internal Server Error",
            message: "500 Internal Server Error, User not logged in",
        });
    }
};
