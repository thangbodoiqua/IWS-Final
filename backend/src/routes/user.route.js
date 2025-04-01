import { Router } from 'express';

const router = Router();

router.get('/like', (req, res) => {
    res.send('User route with get method')
})

export default router;