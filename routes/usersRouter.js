const express = require('express')
const UserModel = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// Create a Router
const router = express.Router()

// Get users
router.get('/', async (req,res) =>{
    try {
        const users = await UserModel.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error);  
    }
})

// Create or register a new user
router.post('/', async (req, res) => {
    const userData = req.body
    console.log(userData);
    try {
         // checking if there is an user with this email in the db
         const userExist = await UserModel.findOne({ email: userData.email })
         // if user exist we return!
         if (userExist) {
             return res.json({ msg: "User already exist" })
         }
 
         //* Create a new User
         // 1 Create the salt
         const SALT = await bcrypt.genSalt(10)   //genSalt shows how many times it will be mixed
         // 2 use the salt to create a hash with the user's password
         const hashedPassword = await bcrypt.hash(userData.password, SALT)
         // 3 assign the hashed passwoed to the userData
         userData.password = hashedPassword
         console.log(hashedPassword);

         // write the user to the DB
        const user = await UserModel.create(userData)
       

         //* Create a new JWT Token
         const payload = {
            id: user._id,
            email: user.email
        }
        const TOKEN = jwt.sign(payload, process.env.SECRET_KEY) 

        res.status(201).json({
            user: user,
            token: TOKEN
        })

    } catch (error) {
        res.status(400).json('Bad request!!! Try again')
    }

})

// Update an user
router.put('/:id', async (req, res) =>{
    //get the id
    const userId = req.params.id
    const newUserData = req.body

    try {
        const user = await UserModel.findByIdAndUpdate(userId, newUserData,{new: true})
        res.status(202).json(user)
    } catch (error) {
        console.log(error);
        res.status(400).json('User not found')
    }
   
})
 
    
// delete an user
router.delete('/:id', async (req, res) =>{
    const userId = req.params.id

    try {
        await UserModel.findByIdAndDelete(userId)
        res.status(200).json({msg: 'User was deleted!'})
    } catch (error) {
        console.log(error)
        res.status(400).json('User not found')
    }
})

module.exports = router