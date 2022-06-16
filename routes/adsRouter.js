const express = require('express')
const AdModel = require('../models/adsSchema')
const authMiddleware = require('../middleware/authMiddleware')


const router = express.Router()

// Read Ads
router.get('/', authMiddleware, async (req,res) =>{
    try {
        const ads = await AdModel.find()
        res.status(200).json(ads)
    } catch (error) {
        console.log(error);
    }
})

// Create Ad
router.post('/', authMiddleware, async (req, res) =>{
    const adsData = req.body
    console.log(adsData);

    try {
        const ad = await AdModel.create(adsData)
        res.status(201).json(ad)
    } catch (error) {
        res.status(400).json('Bad request!!! Try again')
    }
})

// Read Ad by ID
router.get('/:id', authMiddleware, async (req, res) => {
    const id = req.params.id

    try {
        const ad = await AdModel.findById(id)
        res.status(200).json(ad)
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Id not found'
        })
    }
})

// Update Ad by Id
router.put('/:id', authMiddleware, async (req, res) => {
    const id = req.params.id
    const newAdData = req.body

    try {
        const ad = await AdModel.findByIdAndUpdate(id, newAdData, {new:true})
        res.status(202).json(ad)
    } catch (error) {
        console.log(error);
    }
})

// Delete an Ad
router.delete('/:id', authMiddleware, async (req, res) => {
    const id = req.params.id

    try {
        const ad = await AdModel.findByIdAndDelete(id)
        res.status(200).json({msg: " Ad was deleted!"})
    } catch (error) {
        console.log(error);
    }
})

module.exports = router