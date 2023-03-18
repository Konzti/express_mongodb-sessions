import { Router } from 'express';
import { authorizeLineHandler, callbackLineHandler } from '../handlers/line_oauth.js';

const router = Router();

router.post('/auth/line', async (req, res) => authorizeLineHandler(req, res));

router.get('/auth/callback/line', async (req, res) => await callbackLineHandler(req, res));

export default router;