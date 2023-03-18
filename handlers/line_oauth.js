import * as jwt from 'jsonwebtoken';
import LineUser from '../models/LineUser.js';
import { generateRandomString } from '../lib/utils/index.js';

const CALLBACK_URL = encodeURIComponent('http://localhost:3000/api/auth/callback/line');
const TOKEN_URL = "https://api.line.me/oauth2/v2.1/token";

const getLineAuth = async (code) => {

    const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: process.env.LINE_CHANNEL_ID,
        client_secret: process.env.LINE_CHANNEL_SECRET,
        redirect_uri: decodeURIComponent(CALLBACK_URL)
    });

    const res = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: params,

    });

    const data = await res.json();
    console.log(data);
    return data;
};

export const authorizeLineHandler = async (req, res) => {
    let random = generateRandomString(16);
    const AUTH_URL = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.LINE_CHANNEL_ID}&redirect_uri=${CALLBACK_URL}&state=${random}&scope=profile%20openid&nonce=09876xyz`;
    res.cookie('state', random, { maxAge: 900000, httpOnly: true });
    res.redirect(AUTH_URL);
};

export const callbackLineHandler = async (req, res) => {

    if (req.query.state !== req.cookies.state) {
        return res.json({ message: 'Invalid state' });
    }

    try {
        const data = await getLineAuth(req.query.code);

        // decode jwt
        const token = jwt.verify(data.id_token, process.env.LINE_CHANNEL_SECRET, {
            algorithms: ['HS256'],
            issuer: 'https://access.line.me',
            audience: process.env.LINE_CHANNEL_ID
        });
        const { sub, name, picture } = token;

        if (!sub) {
            return res.json({ message: 'Invalid token' });
        }

        const existingUser = await LineUser.findOne({ sub });

        if (existingUser) {
            console.log("existing user", existingUser);
            req.session.user = existingUser;
            return res.redirect('/dashboard');
        }

        const newUser = await LineUser.create({
            sub,
            userName: name,
            picture
        });

        req.session.user = newUser;
        return res.redirect('/dashboard');

    } catch (error) {
        console.log(error);
        return res.redirect('/error');
    }

};