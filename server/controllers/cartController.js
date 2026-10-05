import User from "../models/user.js";

export const updateCart= async (req, res) => {
    try {
        const { userId,cartItems } = req.body;
        await User.findByIdAndUpdate(userId,{ cart: cartItems });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Cart updated successfully' });
    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

