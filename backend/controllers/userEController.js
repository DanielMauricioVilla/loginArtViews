const jwt = require('jsonwebtoken')
const bcrypt = require ('bcryptjs')
const asyncHandler = require ('express-async-handler')
const UserE = require ('../models/userEModel')

//@desc   Register new user entrepreneur
//@route POST /api/userE
//@acess Public
const registerUserE = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('please add all fields')
    }

    //Check if user exists
    const userEExists = await UserE.findOne({email})

    if (userEExists){
        res.status(400)
        throw new Error('user already exists')
    }

    //hash password
    const salt = await  bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const userE = await UserE.create ({
        name,
        email,
        password: hashedPassword
    })

     if (userE){
        res.status(201).json({
            _id: userE.id,
            name: userE.name,
            email: userE.email,
            token: GenerateToken(userE._id),
        })
     }else {
        res.status(400)
        throw new Error('Invalid user data')
     }
})

//@desc   Authenticate a user
//@route POST /api/users/login
//@acess Public
const loginUserE = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    //Check for user email
    const userE = await UserE.findOne({email})

    if (userE && (await bcrypt.compare(password, userE.password))) {
        res.json({
            _id: userE.id,
            name: userE.name,
            email: userE.email,
            token: GenerateToken(userE._id),
        })
    }else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//@desc   Get user data
//@route GET /api/users/me
//@acess Private
const getMe = asyncHandler(async(req, res) => {
    res.status(200).json(req.userE)
} )

//Generate JWT
const GenerateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUserE,
    loginUserE,
    getMe,
}