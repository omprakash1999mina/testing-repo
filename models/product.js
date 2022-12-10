import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: false },
    size: { type: String, required: false },
    image: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Product', productSchema, 'products');
