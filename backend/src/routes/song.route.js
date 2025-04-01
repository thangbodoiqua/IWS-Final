import { Router } from 'express';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';
const router = Router();

async function getAllSongs(req, res, next) {
    try {
        const songs = await Song.find().sort({ createdAt: -1 });
        res.status(200).json(songs);
    } catch (error) {
        next(error);   
    }
}

async function getFeaturedSongs(req, res, next) {
    try {
        //fetch 6 rand songs
        const songs = await Song.aggregate([
            {
                $sample: {size: 6}
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ])

        res.json(songs);
    } catch (error) {
        console.log("getFeaturedSongs", error);
        next(error);
    }
}

async function getMadeForYouSongs(req, res, next) {
    try {
        //fetch 6 rand songs
        const songs = await Song.aggregate([
            {
                $sample: {size: 4}
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ])

        res.json(songs);
    } catch (error) {
        console.log("getMadeForYouSongs", error);
        next(error);
    }
}
async function getTrendingSongs(req, res, next) {
    try {
        //fetch 6 rand songs
        const songs = await Song.aggregate([
            {
                $sample: {size: 6}
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ])

        res.json(songs);
    } catch (error) {
        console.log("getTrendingSongs", error);
        next(error);
    }
}

router.get('/', protectRoute, requireAdmin, getAllSongs);
router.get('/featured', getFeaturedSongs);
router.get('/made-for-yu', getMadeForYouSongs);
router.get('/trending', getTrendingSongs);


export default router;