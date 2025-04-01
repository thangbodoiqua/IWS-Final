import { Router } from 'express';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';
import { User } from '../model/user.model.js';
const router = Router();

async function getAllUsers(req, res, next) {
    try {
        const currentUserId = req.auth.userId;
        const users = await User.find({clerkId: {$ne: currentUserId}});
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

router.get('/', protectRoute, requireAdmin, getAllUsers);

export default router;