import * as bcrypt from "bcrypt";
import User from "../models/User.js";

export const registerUser = async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ email: "email already exists" });

        //bcrypt password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            userName: username,
            email,
            password: hash
        });

        // JWT
        // const token = createToken(newUser._id);
        // res.cookie('auth', token);

        console.log(newUser);

        return res.redirect('/login');

    } catch (err) {

        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};