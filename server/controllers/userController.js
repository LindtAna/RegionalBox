import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import validator from "validator";

//User Registration : /api/user/register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res
                .status(400)
                .json({ success: false, message: "Erforderliche Angaben fehlen" });


        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Ungültige E-Mail-Adresse" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res
                .status(409)
                .json({ success: false, message: "Benutzer ist bereits vorhanden" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.clearCookie("token");
        res.cookie("token", token, {
            httpOnly: true, //prevent JavaScript from accessing a cookie
            secure: process.env.NODE_ENV === "production", //Use secure cookies in production environments
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //Cross-Site Request Forgery protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // cookies expiration time
        });

        return res.status(201).json({
            success: true,
            user: { email: user.email, name: user.name },
        });
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
};


//User Login: api/user/login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res
            .status(400)
            .json({ success: false, message: "Email und Passwort sind erforderlich" });

        const user = await User.findOne({ email });
        if (!user) return res
            .status(401)
            .json({ success: false, message: "Ungültige Anmeldedaten" });

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res
            .status(409)
            .json({ success: false, message: "Ungültige Anmeldedaten" });

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.clearCookie("token");
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            user: { email: user.email, name: user.name },
        });
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
}