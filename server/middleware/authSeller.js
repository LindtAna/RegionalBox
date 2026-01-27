import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
    const { sellerToken } = req.cookies;
    if (!sellerToken) return res
        .status(401)
        .json({ success: false, message: "Nicht autorisiert" });

    try {
        const decodedToken = jwt.verify(sellerToken, process.env.JWT_SECRET)

         const isSeller = decodedToken.email === process.env.SELLER_EMAIL;
         const isDemoSeller = decodedToken.email === process.env.SELLER_DEMO_EMAIL;


          if (isSeller || isDemoSeller) {
            req.seller = {
                email: decodedToken.email,
                isDemoSeller: decodedToken.isDemoSeller || false
            }
            next()
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