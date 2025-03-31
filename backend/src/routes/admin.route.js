import { Router } from 'express';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', protectRoute, requireAdmin, (req, res) => {
    res.send('Admin route with get method')
})

export default router;