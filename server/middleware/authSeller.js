import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
       const { sellerToken } = req.cookies;
    if (!sellerToken)
        return res.json({ success: false, message: 'Nicht autorisiert' });

    try {
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET)

        const isSeller = tokenDecode.email === process.env.SELLER_EMAIL;
        const isDemoSeller = tokenDecode.email === process.env.SELLER_DEMO_EMAIL;

        if (isSeller || isDemoSeller) {
            next();
        }
        else {
            return res
                .status(401)
                .json({ success: false, message: "Nicht autorisiert" });
        }
    } catch (error) {
        console.log(error.stack)
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
}

export default authSeller
