import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { useContext } from 'react';

export const register = async (req, res) => {
    // Registration logic here
    try {
        const { name, email, password } = req.body;
        // Validate input
        if (!name || !email || !password) {
            return res.json({success:false, message: 'All fields are required' });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({success:false, message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
            maxAge: 3600000
         });

         return res.status(201).json({ message: 'User registered successfully', userId:{email:newUser.email,name:newUser.name}, success:true  });

    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


//user login controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            return res.json({success:false, message: 'All fields are required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({success:false, message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({success:false, message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
            maxAge: 3600000
         });
         
         return  res.status(200).json({ message: 'Login successful', userId:{email:user.email,name:user.name}, success:true  });
    } catch(error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
       

// auth user
export const isAuth = async (req, res) => {
    try {
        // req.userId comes from middleware ONLY
        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.error("Auth user error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// user logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict' });
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}   