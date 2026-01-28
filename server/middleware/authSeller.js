import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/token.js";

const authSeller = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.substring(7)
        : null;

    console.log('authSeller-Token:', token ? 'Exists' : 'Missing');
    console.log('authSeller-Header:', authHeader);

    if (!token) return res
        .status(401)
        .json({ success: false, message: "Nicht autorisiert" });

    try {
        const tokenDecode = verifyToken(token);

        if (!tokenDecode) {
            return res.status(401).json({ success: false, message: "Ungültiger Token" });
        }

        const isSeller = tokenDecode.email === process.env.SELLER_EMAIL;
        const isDemoSeller = tokenDecode.email === process.env.SELLER_DEMO_EMAIL;

          console.log('authSeller-isSeller:', isSeller, 'isDemoSeller:', isDemoSeller);

        if (isSeller || isDemoSeller) {
            req.seller = {
                email: tokenDecode.email,
                isDemoSeller: tokenDecode.isDemoSeller || false
            }
            next();
        }
        else {
            return res
                .status(401)
                .json({ success: false, message: "Nicht autorisiert" });
        }
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
}

export default authSeller
