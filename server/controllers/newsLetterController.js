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
}

// Eine Liste der E-Mail-Adressen abrufen: /api/newsletter/list
// get all orders for Seller/admin : /api/seller/newsletter-list
export const getEmails = async (req, res) => {
    try {
        const emails = await Newsletter.find({})
        return res
            .status(200)
            .json({ success: true, emails});
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'getEmails fehler' })
    }
}

export const toggleActive = async (req, res) => {
    const { id } = req.params;
    try {
        const newsletter = await Newsletter.findById(id);
        if (!newsletter) {
            return res.status(404).json({ success: false, message: 'toggleActive fehler' });
        }
        newsletter.active = !newsletter.active;
        await newsletter.save();
        return res.status(200).json({
            success: true,
            message: 'Status aktualisiert',
            active: newsletter.active,
        });
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
};

// E-Mail als CSV herunterladen: /api/newsletter/download
export const downloadEmailsCSV = async (req, res) => {
    try {
        const emails = await Newsletter.find({ active: true }).select('email createdAt')
        
        // Generieren einer CSV-Datei (header + rows)
        let csvContent = 'Email, CreatedAt\n'; 
        emails.forEach(email => {
            csvContent += `${email.email},${email.createdAt.toISOString()}\n`
        });

        res.header('Content-Type', 'text/csv');
        res.header('Content-Disposition', 'attachment; filename=newsletter_emails.csv')
        
        return res.send(csvContent)
    } catch (error) {
        console.log(error.stack)
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' })
    }
}

// getEmails: Gibt ein JSON-Array mit Objekten zurück, die E-Mail-Adressen und Erstellungsdaten enthalten
// downloadEmailsCSV: Erzeugt eine CSV-Zeichenkette und sendet diese als Datei