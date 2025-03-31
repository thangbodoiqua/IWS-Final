import { Router } from 'express';
import { protectRoute } from '../middleware/auth.middleware';

const router = Router();

router.get('/like', (req, res) => {
    res.send('User route with get method')
})

export default router;