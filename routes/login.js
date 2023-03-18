import { Router } from 'express';
import { loginHandler } from '../handlers/login.js';

const router = Router();

router.get('/', (req, res) => {
    res.render('login', { title: "Login" });
});
router.post('/', loginHandler);

export default router;