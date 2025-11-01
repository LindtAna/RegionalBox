import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Angebot from "../models/Angebot.js";

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
            let product = await Product.findById(item.product);
            if (!product) {
                product = await Angebot.findById(item.product);
            }
            if (!product) {
                return res.status(400).json({ success: false, message: "Produkt nicht gefunden" });
            }
            const priceToUse = product.offerPrice || product.price;
            amount += priceToUse * item.quantity;
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
        }).sort({ createdAt: -1 })

        const populatedOrders = [];
        for (const order of orders) {
            const populatedItems = [];
            for (const item of order.items) {
                let product = await Product.findById(item.product);
                if (!product) product = await Angebot.findById(item.product);
                populatedItems.push({ ...item.toObject(), product });
            }
            populatedOrders.push({ ...order.toObject(), items: populatedItems });
        }

        return res
            .status(200)
            .json({ success: true, orders: populatedOrders });

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
        }).sort({ createdAt: -1 })

        const populatedOrders = [];
        for (const order of orders) {
            const populatedItems = [];
            for (const item of order.items) {
                let product = await Product.findById(item.product);
                if (!product) product = await Angebot.findById(item.product);
                populatedItems.push({ ...item.toObject(), product });
            }
            populatedOrders.push({ ...order.toObject(), items: populatedItems });
        }

        return res
            .status(200)
            .json({ success: true, orders: populatedOrders});

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
}
