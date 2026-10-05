import Order from '../models/Order.js';
// import product from '../models/product.js';

export const placeOrder = async (req, res) => {
    try {
        const { userId, items, address, paymentMethod } = req.body;

        if (!address || address.length === 0) {
            return res.status(400).json({ message: 'Shipping address is required' });
        }
        // Calculate total amount
        let amount=await items.reduce(async(total, item) =>{
            const Product=await product.findById(item.productId);
            return (await total) + (product.offerPrice * item.quantity);

        } ,0)

        // add tax charge (2%)
         amount+= Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentMethod,
            isPaid: paymentMethod === 'Online' ? true : false,
            paidAt: paymentMethod === 'Online' ? new Date() : null
        });

        res.status(200).json({ message: 'Order placed successfully', order: Order });
    } catch (error) {
        console.error('Place order error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get Orders Controller

export const getOrders= async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId,
         $or:[{paymentMethod:"COD" },{isPaid:true}]
        }).populate('items.productId').sort({ createdAt: -1 });
        if (!orders) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
        res.status(200).json({ orders });
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}   


// Get All Orders Controller (Admin)

export const getAllOrders= async (req, res) => {
    try {
        const orders = await Order.find({
            $or:[{paymentMethod:"COD" },{isPaid:true}]
        }).populate('items.productId').sort({ createdAt: -1 });
        res.status(200).json({ orders });
    } catch (error) {
        console.error('Get all orders error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Update Order Status Controller (Admin)

export const updateOrderStatus= async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}   