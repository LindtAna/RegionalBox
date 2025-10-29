import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
    const { sellerToken } = req.cookies;
    if (!sellerToken) return res
        .status(401)
        .json({ success: false, message: "Nicht autorisiert" });

    try {
        const decodedToken = jwt.verify(sellerToken, process.env.JWT_SECRET)
        if (decodedToken.email === process.env.SELLER_EMAIL) {
            next();
        } else {
            return res
                .status(401)
                .json({ success: false, message: "Nicht autorisiert" });

        }
    } catch (error) {
        console.log(error.stack);
        return res.status(401).json({ success: false, message: "Nicht autorisiert" });
    }
}

export default authSeller