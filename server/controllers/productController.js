import { v2 as cloudinary } from "cloudinary"
import Product from "../models/product"

// Add Product : api/product/add

export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData)

        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader
                    .upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        await Product.create({ ...productData, image: imagesUrl })

        return res
            .status(200)
            .json({ success: true, message: "Produkt hunzugefügt" });

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
}


// Get Product : api/product/list

export const productList = async (req, res) => {
    try{
        const products = await Product.find({})
        return res
            .status(200)
            .json({ success: true, products});

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
}


// Get one Product : api/product/id

export const productById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({ success: false, message: "Produkt nicht gefunden" });

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({ success: false, message: "Interner Serverfehler" });
  }
};

// Change product inStock : api/product/stock

export const changeStock = async (req, res) => {
     try{
        const{id, inStock} = req.body
        await Product.findByIdAndUpdate(id, {inStock})
        return res
            .status(200)
            .json({ success: true, message: "Lagerbestand aktualisiert"});

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
    }
}
