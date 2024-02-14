import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const createToken = _id => {
    return jwt.sign(
        { _id },
        process.env.JWT_SECRET,  
        { expiresIn: '3d' }
    );
};

// signup
export const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};