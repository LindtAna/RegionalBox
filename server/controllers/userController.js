import bcrypt from "bcryptjs";
import User from "../models/User.js";
import validator from "validator";
import { generateToken, setTokenCookie } from "../utils/jwt.js";

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

        const token = generateToken(user._id);
        setTokenCookie(res, token);

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
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: "Ungültige Anmeldedaten" });
        }

        const token = generateToken(user._id);
         setTokenCookie(res, token);

        return res.status(200).json({
            success: true,
            user: { email: user.email, name: user.name },
        });
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
}

//Check Auth : /api/user/is-auth

export const isAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "Benutzer nicht gefunden" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({ success: false, message: "Interner Serverfehler" });
  }
};


// User Logout: /api/user/logout

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return res.status(200).json({ success: true, message: 'Abgemeldet' });

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
}