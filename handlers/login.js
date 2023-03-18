import * as bcrypt from "bcrypt";
import User from "../models/User.js";

export const loginHandler = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.redirect('/login');
    }

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.render('login', { title: "Login", error: "Wrong credentials" });

        bcrypt.compare(password, existingUser.password, (err, same) => {
            if (err) {
                return res.render('login', { title: "Login", error: "🤮 Something went wrong..." });
            }
            if (same) {
                req.session.user = existingUser;
                return res.redirect('/dashboard');
            } else {
                return res.render('login', { title: "Login", error: "Wrong credentials" });
            }
        });

    } catch (err) {
        res.status(400).json({ error: err });
    }
};