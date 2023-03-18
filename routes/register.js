import { Router } from 'express';
import env from 'dotenv';
import { registerUser } from '../handlers/register.js';

env.config();

const router = Router();

router.get('/', (req, res) => {
    res.render('register', { title: "Register" });
});

// Error handling while trying to create user in MongoDB
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { userName: '', email: '', password: '' };
    if (err.code === 11000) {
        errors.email = "This email is already registered";
        return errors;
    }
    if (err.message.includes('user validation failed')) {

        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        return errors;
    }
};



router.post('/', registerUser);



export default router;