import Address from "../models/Address.js";


// Add Address Controller

export const addAddress= async (req, res) => {
    try {
        const { userId, address } = req.body;
        await Address.create(...address, userId);
        res.status(200).json({ message: 'Address added successfully' });
    } catch (error) {
        console.error('Add address error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get Addresses Controller

export const getAddresses= async (req, res) => {
    try {
        const { userId } = req.params;
        const addresses = await Address.findOne({ userId });
        if (!addresses) {
            return res.status(404).json({ message: 'No addresses found for this user' });
        }
        res.status(200).json({ addresses });
    } catch (error) {
        console.error('Get addresses error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}   