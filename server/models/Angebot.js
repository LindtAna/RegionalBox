import mongoose from "mongoose";

const actionProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: Array, required: true },
    volume: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    highlight: { type: Boolean, default: false }
}, { timestamps: true })

const Angebot = mongoose.models.angebot || mongoose.model('angebot', actionProductSchema)


export default Angebot