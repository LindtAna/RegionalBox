import validator from 'validator';
import Newsletter from '../models/Newsletter.js';

//Email für Newsletter hunzufügen : /api/newsletter/add
export const addEmail = async (req, res) => {
    try {
        let { email } = req.body;

        if (!email)
            return res
                .status(400)
                .json({ success: false, message: "Erforderliche Angaben fehlen" });

        email = email.trim().toLowerCase();

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Ungültige E-Mail-Adresse" });
        }

        const existingEmail = await Newsletter.findOne({ email });
        if (existingEmail)
            return res
                .status(409)
                .json({ success: false, message: "Diese E-Mail ist schon angemeldet" });

        const newEmail = await Newsletter.create({ email });

        return res.status(201).json({
            success: true,
            message: "Erfolgreich angemeldet",
            email: newEmail.email,
        });
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
};