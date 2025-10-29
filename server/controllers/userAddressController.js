import UserAddress from "../models/UserAddress.js";

// Add User Address : /api/address/add
export const addAddress = async (req, res) => {
     try{
        const userId = req.user.userId; 
        const addressData = req.body;
        await UserAddress.create({...addressData, userId})
        return res
            .status(201)
            .json({ success: true, message: "Lieferadresse hinzugefügt"});

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
}


// get address: api/address/get

export const getAddress = async (req, res) => {
     try{
        const userId = req.user.userId;
        const addresses = await UserAddress.find({userId})

        if (!addresses.length) {
      return res.status(404).json({ success: false, message: "Keine Lieferadressen gefunden" });
    }
    
        return res
            .status(200)
            .json({ success: true, addresses});

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
}
