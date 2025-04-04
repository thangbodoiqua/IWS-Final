import { Router } from 'express';

const router = Router();
async function getAllAlbums(req, res, next) {
    try {
        const albums = await Album.find();
    
        res.status(200).json(albums);
    } catch (error) {
        console.error('Error getting all albums:', error);
        next(error);
    }
}

async function getAllAlbumById(req, res, next) {
    try {
        const { albumId } = req.params
        const album = await Album.findById(albumId).populate('songs');
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        
        res.status(200).json(album);
    } catch (error) {
        console.error('Error getting album by ID:', error);
        next(error);
    }
}

router.get('/', getAllAlbums);
router.get('/:id', getAllAlbumById);

export default router;