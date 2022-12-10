import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    age: { type: String, required: false },
    gender: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' },
    image: { type: String, required: true },

}, { timestamps: true });

export default mongoose.model('User', userSchema, 'users');




