import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
    email: {type: String, required: [true, 'E-Mail-Adresse erforderlich'],
    unique: true, trim: true, match: [/.+@.+\..+/, 'Falsches E-Mail-Format']},
    active:{ type: Boolean, default: true },
},{ timestamps: true })

const Newsletter = mongoose.models.newsletter || mongoose.model('newsletter', newsletterSchema)

export default Newsletter