const express = require('express')
const songModel = require('../models/song.model')
const multer = require('multer')
const uploadFile = require('../service/storage.service')
const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() })

router.post('/songs', upload.single("audio"), async (req, res) => {
    const fileData = await uploadFile(req.file)
    console.log(fileData)
    const song = await songModel.create({
        title: req.body.title,
        artist: req.body.artist,
        mood: req.body.mood,
        audio: fileData.url


    })
    res.status(201).json({
        message: "Song added successfully",
        song: song

    })
})

router.get('/songs',async(req,res)=>{
    const {mood} = req.query;

    const songs = await songModel.find({
        mood : mood
    })
    console.log(songs)
    res.status(200).json({
        message: "Songs fetched successfully",
        songs: songs
    })
})





module.exports = router