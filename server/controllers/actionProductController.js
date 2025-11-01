import { v2 as cloudinary } from "cloudinary"
import Angebot from "../models/Angebot.js"
import { connectCloudinary } from "../configs/cloudinary.js"; 

// Add Product : api/action-product/add

export const addActionProduct = async (req, res) => {
    try {
        let actionProductData = JSON.parse(req.body.actionProductData)

        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader
                    .upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        await Angebot.create({ ...actionProductData, image: imagesUrl })

        return res
            .status(200)
            .json({ success: true, message: "Produkt hunzugefügt" });

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
}


// Get Action Product : api/action-product/list

export const actionProductList = async (req, res) => {
    try{
        const actionProducts = await Angebot.find({})
        return res
            .status(200)
            .json({ success: true, actionProducts});

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
}


// Get one Product : api/action-product/id

export const actionProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const actionProduct = await Angebot.findById(id);
    if (!actionProduct)
      return res.status(404).json({ success: false, message: "Produkt nicht gefunden" });

    return res.status(200).json({ success: true, actionProduct});
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({ success: false, message: "Interner Serverfehler" });
  }
};

// Change product inStock : api/action-product/stock

export const changeStock = async (req, res) => {
     try{
        const{id, inStock} = req.body
        await Angebot.findByIdAndUpdate(id, {inStock})
        return res
            .status(200)
            .json({ success: true, message: "Lagerbestand aktualisiert"});

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
}


export const changeHighlight = async (req, res) => {
  try {
    const { id, highlight } = req.body;
    await Angebot.findByIdAndUpdate(id, { highlight });
    return res.status(200).json({ success: true, message: "Highlight aktualisiert" });
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({ success: false, message: "Interner Serverfehler" });
  }
};