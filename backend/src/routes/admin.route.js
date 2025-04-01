import { Router } from 'express';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';
import { Song } from '../model/song.model.js';
import { Album } from '../model/album.model.js';
import  cloudinary  from '../lib/cloudinary.js';

const router = Router();
router.use(protectRoute, requireAdmin);
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: 'auto',
        }); 

        return result.secure_url;
    } catch (error) {
        console.error('Error in uploadToCloudinary:', error);
        throw new Error('Failed to upload file to Cloudinary');
    }
}

async function createSong(req, res, next) {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ message: 'Please upload all fikes' });
        }
        const { title, artist, albumId, duration } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        const song = new Song({
            title: title,
            artist: artist,
            audioUrl: audioFile,
            imageUrl: imageFile,
            duration: duration,
            albumId: albumId || null,
        })
        await song.save();

        if(albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id },
            });
        }
        res.status(201).json(song);
    } catch (error) {
        console.error('Error creating song:', error);
        next(error);
    }
}

async function deleteSong(req, res, next){
    try {
        const { id } = req.params;

        const song = await Song.findById(id);
        
        if (song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id },
            }); 
        }

        await Song.findByIdAndDelete(id);

        res.status(200).json({ message: 'Song deleted successfully' });
    } catch (error) {
        console.log("Error deleting song:", error);
        next(error);
    }
};

async function createAlbum(req, res, next) {
    try {
        const { title, artist, releaseYear } = req.body;
        const { imageFile } = req.files;
        const imageUrl = await uploadToCloudinary(imageFile);
        const album = new Album({
            title: title,
            artist: artist,
            releaseYear: releaseYear,
            imageUrl: imageUrl,
        });
        await album.save();
        res.status(201).json(album);
    } catch (error) {
        console.log("Error creating album:", error);
        next(error);
    }
}
 
async function deleteAlbum(req, res, next) {
    try {
        const { id } = req.params;
        await Song.deleteMany({ albumId: id });
        await Album.findByIdAndDelete(id);
        res.status(200).json({ message: 'Album deleted successfully' });
    } catch (error) {
        console.log("Error deleting album:", error);
        next(error);
    }
}

async function checkAdmin(req, res, next) {
    res.status(200).json({admin})
}

router.get('/check', checkAdmin)
router.post('/songs', createSong)
router.delete('/songs/:id', deleteSong)
router.post('/abums', createAlbum)
router.delete('/albums/:id', deleteAlbum)

export default router;