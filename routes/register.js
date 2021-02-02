import { Router } from 'express';
import env from 'dotenv';
import User from '../models/User.js';

env.config();
const secret = process.env.JWT_SECRET;

const router = Router();
router.get('/', (req, res) => {
    res.render('register', {title: "Register"});
})

// Error handling while trying to create user in MongoDB
const handleErrors = (err) => {
console.log(err.message, err.code);
let errors = {userName: '', email: '', password: ''};
if (err.code === 11000) {
    errors.email = "This email is already registered";
    return errors;
}
if (err.message.includes('user validation failed')){
    
    Object.values(err.errors).forEach(({properties}) => {
        errors[properties.path] = properties.message;
    })
 return errors;
}
}

// JWT
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, secret, {
        expiresIn: maxAge
    })
}

router.post('/', async (req, res) => {
    const {username, email, password} = req.body;
     console.log(req.body);
    try {
        // await User.findOne({ email }).then((user => {
        // if (user) {
        //     return res.status(400).json({email: "email already exists"})
        // }else {
        const newUser = await User.create({
                userName: username,
                email,
                password
            });
        // const token = createToken(newUser._id);
        // res.cookie('auth', token);
        res.status(200).json({newUser});
        }
    // }));

    // } 
    catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
    
});

export default router;