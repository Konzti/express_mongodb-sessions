import { Router } from 'express';

const router = Router();
router.get('/', (req, res) => {
    res.render('login', {title: "Login"});
})
router.post('/', (req, res) => {
    console.log(req.body);
    res.send('welcome, ' + req.body.email);
})

export default router;