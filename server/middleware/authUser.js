import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res
        .status(401)
        .json({ success: false, message: "Nicht autorisiert" });

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if (decodedToken.id) {
            req.user = {id: decodedToken.id}
            next();
        }
    } catch (error) {
        console.log(error.stack);
        return res.status(401).json({ success: false, message: "Nicht autorisiert" });
    }
}

export default authUser