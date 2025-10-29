import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Place Order (Cash on Delivery): POST /api/orders/cod

export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        if (!address || !items || items.length === 0) {
            return res.status(400).json({ success: false, message: "Ungültige Daten" });
        }

        //den Betrag anhand der Artikel berechnen

        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            amount += product.price * item.quantity;
        }
        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: 'COD'
        })
        return res
            .status(200)
            .json({ success: true, message: "Bestellung aufgegeben" });

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
}

// get orders by userId : /api/orders/user?userId=...

export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.query

        const orders = await Order.find({
            userId, 
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate('items.product address')
        .sort({ createdAt: -1 })

        return res
            .status(200)
            .json({ success: true, orders });

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
}


// get all orders for Seller/admin : /api/orders/seller

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        })
        .populate('items.product address')
        .sort({ createdAt: -1 })

        return res
            .status(200)
            .json({ success: true, orders });

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
}
