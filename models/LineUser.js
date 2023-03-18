import mongoose from 'mongoose';
import validator from 'validator';
const { isEmail } = validator;


const lineUserSchema = new mongoose.Schema({
    sub: {
        type: String,
        unique: true,
    },
    userName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    picture: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const LineUser = mongoose.model('line_user', lineUserSchema);
export default LineUser;