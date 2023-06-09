const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require ('../models/userModel')
const UserE = require ('../models/userEModel')
const administrator = require('../models/admModel')
const investor = require('../models/invModel')


const protect = asyncHandler(async (req, res, next) => {
    let token 

    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    )   {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from the token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        }catch (error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

//----------userE---------

const protectE = asyncHandler(async (req, res, next) => {
    let token 

    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    )   {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from the token
            req.userE = await UserE.findById(decoded.id).select('-password')

            next()
        }catch (error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect, protectE }