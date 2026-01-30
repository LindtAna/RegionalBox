import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
       const { sellerToken } = req.cookies;
    if (!sellerToken) {
        return res.status(401).json({
            success: false,
            message: "Nicht autorisiert"
        });
    }

    try {
        const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET)

        const isSeller =
            decoded.email === process.env.SELLER_EMAIL ||
            decoded.email === process.env.SELLER_DEMO_EMAIL;

        if (!isSeller) {
            return res
                .status(401)
                .json({ success: false, message: "Nicht autorisiert" });
        }

        req.seller = {
            email: decoded.email,
            isDemoSeller: decoded.isDemoSeller
        }
next()
    } catch (error) {
        console.log(error.stack)
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
}

export default authSeller