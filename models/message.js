import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    email: { type: String, required: true, }

}, { timestamps: true });

export default mongoose.model('Message', messageSchema, 'messages');
