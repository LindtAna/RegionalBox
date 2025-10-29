import jwt from "jsonwebtoken";

// Überprüfung der Umgebungsvariablen 
const validateEnv = () => {
  const required = ["JWT_SECRET", "SELLER_EMAIL", "SELLER_PASSWORD"];
  required.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Environment variable ${key} is not defined`);
    }
  });
};

// Führe die Prüfung einmal beim Laden des Moduls aus
validateEnv();


//Seller Login: api/seller/login

export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

            res.cookie("sellerToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res
                .status(200)
                .json({ success: true, message: "Angemeldet" });
        } else {
            return res.status(401).json({ success: false, message: "Ungültige Anmeldedaten" });
        }

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
}


//Check Seller Auth : /api/seller/is-auth

export const isSellerAuth = async (req, res) => {
  try {
    return res.status(200).json({ success: true});
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({ success: false, message: "Interner Serverfehler" });
  }
};

// Seller Logout: /api/seller/logout

export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie("sellerToken", {
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