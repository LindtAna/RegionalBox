import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/token.js";

const authUser = async (req, res, next) => {
const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') 
        ? authHeader.substring(7) 
        : null;
    if (!token) return res
        .status(401)
        .json({ success: false, message: "Nicht autorisiert" });

    try {
        const tokenDecode = verifyToken(token);

        if (tokenDecode && tokenDecode.id) {
            req.user = { _id: tokenDecode.id };
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

export default authUser