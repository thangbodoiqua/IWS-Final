import { Router } from 'express';
import { Song } from '../model/song.model.js';
import { User } from '../model/user.model.js';
import { Album } from '../model/album.model.js';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js'

const router = Router();

async function getStats(req, res, next) {
    try {
        const { totalSongs, totalUsers, totalAlbums } = await Promise.all([
            Song.countDocuments(),
            User.countDocuments(),
            Album.countDocuments(),
            Song.aggregate([
                {
                    $unionWith: {
                        coll: "albums",
                        pipeline: []
                    }
                },
                {
                    $group: {
                        _id: "$artist",
                    }
                },
                {
                    $count: "count"
                }
            ])
        ]);

        res.status(200).json({
            totalAlbums,
            totalSongs,
            totalUsers,
            totalArtists: totalArtists[0]?.count || 0,
        })
        
    } catch (error) {
        console.log("getAllStats", error);
        next(error);
    }
}
router.get('/', protectRoute, requireAdmin, getStats);

export default router;