import User from "../models/User.js";

// Update User Cart Data : /api/cart/update

export const updateCart = async (req, res) => {
     try{
        const{userId, cartItems} = req.body
        await User.findByIdAndUpdate(userId, {cartItems})
        return res
            .status(200)
            .json({ success: true, message: "Einkaufswagen aktualisiert"});

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
}
