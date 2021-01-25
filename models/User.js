import mongoose from 'mongoose';
import validator from 'validator';
const { isEmail } = validator;


const userSchema = new mongoose.Schema({
     userName: {
        type: String,
        required: [true, 'Please enter a user name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter an email address'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address!']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const User = mongoose.model('user', userSchema);
export default User;