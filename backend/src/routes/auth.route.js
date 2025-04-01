import { Router } from 'express';
import { User } from '../model/user.model.js';

const router = Router();

router.get('/callback', async (req, res, next) => {
    try{
        const {id, firstName, lastName, imageUrl} = req.body
        const user = await User.findOne({clerkId: id});

        if(!user){
            await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl: imageUrl,
            })
        }
        res.status(200).json({success: true})
        
    }catch (error){
        console.log(`Error in auth callback: ${error}`);
        next(error);
    }
})

export default router;