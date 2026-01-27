export const demoSeller = (req, res, next) => {
    if (req.seller && req.seller.isDemoSeller) {
        return res.status(403).json({ 
            success: false, 
            message: "Demo-Zugriff: Änderungen nicht erlaubt" 
        });
    }
    next();
};