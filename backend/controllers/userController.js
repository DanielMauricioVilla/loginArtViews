const jwt = require('jsonwebtoken')
const bcrypt = require ('bcryptjs')
const asyncHandler = require ('express-async-handler')
const User = require ('../models/userModel')
const Role = require('../models/rolModel')
const Administrator = require('../models/admModel')
const Investor = require('../models/invModel')
const UserE = require ('../models/userEModel')
const Product = require ('../models/productModel')


//@desc   Register new user
//@route POST /api/users
//@acess Public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password, date, roles} = req.body

    if (!name || !email || !password|| !date) {
        res.status(400)
        throw new Error('please add all fields')
    }

    //Check if user exists
    const userExists = await User.findOne({email})

    if (userExists){
        res.status(400)
        throw new Error('user already exists')
    }

    //hash password
    const salt = await  bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await User.create ({
        name,
        email,
        date,
        password: hashedPassword,
    })

    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}})
        user.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name: "cliente"})
        user.roles = [role._id]
    }

     if (user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            rol: user.roles,
            token: GenerateToken(user._id),
        })
     }else {
        res.status(400)
        throw new Error('Invalid user data')
     }

     const savedUser = await user.save();
     console.log(savedUser);
})

//@desc   Authenticate a user
//@route POST /api/users/login
//@acess Public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    //Check for user email
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            rol: user.roles,
            token: GenerateToken(user._id),
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
    res.status(200).json(req.user)
} )


//@desc   update user
//@route PUT /api/user/:id
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status (400)
        throw new Error('Product not found')
    }

    /*Chaeck for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    Make sure the logged in user maches the goal user
    if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not autorized')
    }*/

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedUser)
})

//@desc   Delete user
//@route DELETE /api/user/:id
//@acess Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status (400)
        throw new Error('Product not found')
    }

    /*//Chaeck for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user maches the goal user
    if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not autorized')
    }*/

    await User.findByIdAndDelete(user)

    res.status(200).json({ id: req.params.id })
})


//Generate JWT
const GenerateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

//---------------investor-----------
//@desc   Register new investor
//@route POST /api/
//@acess Public
const registerInvestor = asyncHandler(async(req, res) => {
    const { name, email, password, date, roles} = req.body

    if (!name || !email || !password|| !date) {
        res.status(400)
        throw new Error('please add all fields')
    }

    //Check if user exists
    const investorExists = await Investor.findOne({email})

    if (investorExists){
        res.status(400)
        throw new Error('user already exists')
    }

    //hash password
    const salt = await  bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const investor = await Investor.create ({
        name,
        email,
        date,
        password: hashedPassword,
    })

    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}})
        investor.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name: "inversionista"})
        investor.roles = [role._id]
    }

     if (investor){
        res.status(201).json({
            _id: investor.id,
            name: investor.name,
            email: investor.email,
            rol: investor.roles,
            token: GenerateToken(investor._id),
        })
     }else {
        res.status(400)
        throw new Error('Invalid investor data')
     }

     const savedinvestor = await investor.save();
     console.log(savedinvestor);
})

//@desc   Authenticate a user
//@route POST /api/users/login
//@acess Public
const loginInvestor = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    //Check for user email
    const investor = await Investor.findOne({email})

    if (investor && (await bcrypt.compare(password,investor.password))) {
        res.json({
            _id: investor.id,
            name: investor.name,
            email: investor.email,
            rol: investor.roles,
            token: GenerateToken(investor._id),
        })
    }else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//@desc   Get user data
//@route GET /api/users/me
//@acess Private
const getMeinvestor = asyncHandler(async(req, res) => {
    res.status(200).json(req.user)
} )

//Generate JWT
const GenerateTokeninvestor = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

//@desc   update user
//@route PUT /api/user/:id
const updateInvestor = asyncHandler(async (req, res) => {
    const investor = await Investor.findById(req.params.id)

    if (!investor) {
        res.status (400)
        throw new Error('Product not found')
    }

    /*Chaeck for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    Make sure the logged in user maches the goal user
    if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not autorized')
    }*/

    const updatedInvestor= await Investor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedInvestor)
})

//@desc   Delete user
//@route DELETE /api/user/:id
//@acess Private
const deleteInvestor = asyncHandler(async (req, res) => {
    const investor = await Investor.findById(req.params.id)

    if (!investor) {
        res.status (400)
        throw new Error('Product not found')
    }

    /*//Chaeck for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user maches the goal user
    if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not autorized')
    }*/

    await Investor.findByIdAndDelete(investor)

    res.status(200).json({ id: req.params.id })
})

//------------administreator-----

const registeAdministrator = asyncHandler(async(req, res) => {
    const { name, email, password, roles} = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('please add all fields')
    }

    //Check if user exists
    const administratorExists = await Administrator.findOne({email})

    if (administratorExists){
        res.status(400)
        throw new Error('user already exists')
    }

    //hash password
    const salt = await  bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const administrator = await Administrator.create ({
        name,
        email,
        password: hashedPassword,
    })

    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}})
        administrator.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name: "administrador"})
        administrator.roles = [role._id]
    }

     if (administrator){
        res.status(201).json({
            _id: administrator.id,
            name: administrator.name,
            email: administrator.email,
            rol: administrator.roles,
            token: GenerateToken(administrator._id),
        })
     }else {
        res.status(400)
        throw new Error('Invalid administrator data')
     }

     const savedadministrator = await administrator.save();
     console.log(savedadministrator);
})

//@desc   Authenticate a user
//@route POST /api/users/login
//@acess Public
const loginAdministrator = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    //Check for user email
    const administrator = await Administrator.findOne({email})

    if (administrator && (await bcrypt.compare(password,administrator.password))) {
        res.json({
            _id: administrator.id,
            name: administrator.name,
            email: administrator.email,
            rol: administrator.roles,
            token: GenerateToken(administrator._id),
        })
    }else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//@desc   Get user data
//@route GET /api/users/me
//@acess Private
const getMeadministrator = asyncHandler(async(req, res) => {
    res.status(200).json(req.user)
} )

//Generate JWT
const GenerateTokenadministrator = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

//@desc   update user
//@route PUT /api/user/:id
const updateAdministrator = asyncHandler(async (req, res) => {
    const administrator = await Administrator.findById(req.params.id)

    if (!administrator) {
        res.status (400)
        throw new Error('Product not found')
    }

    /*Chaeck for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    Make sure the logged in user maches the goal user
    if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not autorized')
    }*/

    const updatedAdministrator= await Administrator.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedAdministrator)
})


//---------userE---------


//@desc   Register new user entrepreneur
//@route POST /api/userE
//@acess Public
const registerUserE = asyncHandler(async(req, res) => {
    const { name, email, password, roles } = req.body

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
        password: hashedPassword,
    })

    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}})
        userE.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name: "emprendedor"})
        userE.roles = [role._id]
    }


     if (userE){
        res.status(201).json({
            _id: userE.id,
            name: userE.name,
            email: userE.email,
            rol: userE.roles,
            token: GenerateToken(userE._id),
        })
     }else {
        res.status(400)
        throw new Error('Invalid user data')
     }

     const savedUser = await userE.save();
     console.log(savedUser);
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
            rol: userE.roles,
            token: GenerateToken(userE._id),
        })
    }else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//@desc   Get userE data
//@route GET /api/users/me
//@acess Private
const getMeE = asyncHandler(async(req, res) => {
    res.status(200).json(req.userE)
})

//@desc   update user
//@route PUT /api/user/:id
const updateUserE = asyncHandler(async (req, res) => {
    const userE = await UserE.findById(req.params.id)

    if (!userE) {
        res.status (400)
        throw new Error('Product not found')
    }

    /*Chaeck for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    Make sure the logged in user maches the goal user
    if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not autorized')
    }*/

    const updatedUserE = await UserE.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedUserE)
})

//@desc   Delete user
//@route DELETE /api/user/:id
//@acess Private
const deleteUserE = asyncHandler(async (req, res) => {
    const userE = await UserE.findById(req.params.id)

    if (!userE) {
        res.status (400)
        throw new Error('Product not found')
    }

    /*//Chaeck for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user maches the goal user
    if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not autorized')
    }*/

    await UserE.findByIdAndDelete(userE)

    res.status(200).json({ id: req.params.id })
})


//-------------------rol--------------

//@route POST /api/users/rol
const getRol = asyncHandler(async(req, res) => {
    const {email} = req.body
    const user = await User.findOne({ email: email})
    const userE = await UserE.findOne({ email: email})
    const administrator = await Administrator.findOne({ email: email})

    if (user) {
        const {roles} = user;
        res.status(200).json({
            roles,
        });
    }else if (userE){
        const {roles} = userE;
        res.status(200).json({
            roles,
        });
    }else if (administrator){
        const {roles} = administrator;
        res.status(200).json({
            roles,
        });
    }else {
        res.status(404).json({
            message: 'no existe'
        })
    }
});

//------------rpoduct--------

//@route POST /api/product/product
const createProduct = asyncHandler(async(req, res) => {
    // const { email, nameP, img, category, price, cant, description, nombreEmprendimiento } = req.body
    const { nameP, img, category, price, cant, description} = req.body

    // if ( !email || !nameP || !img || !category || !price || !cant || !description) {
    if ( !nameP || !img || !category || !price || !cant || !description) {
        res.status(400)
        throw new Error('please add all fields')
    }

    //Check if user exists
    const productExists = await Product.findOne({nameP})

    if (productExists){
        res.status(400)
        throw new Error('user already exists')
    }

    //Create product
    const product = await Product.create ({
        // email,
        nameP,
        img,
        category,
        price,
        cant,
        description,
    })

    // if (nombreEmprendimiento) {
    //     const foundProduct = await UserE.find({name: {$in: nombreEmprendimiento}})
    //     product.nombreEmprendimiento = foundProduct.map(us => us._id)
    // } else {
    //     const userE = await UserE.findOne({email})
    //     product.nombreEmprendimiento = [userE._id]
    // }

     if (product){
        res.status(201).json({
            _id: product.id,
            nameP: product.name,
            img: product.img,
            category: product.category,
            price: product.price,
            cant: product.cant,
            description: product.description,
            // nombreEmprendimiento: product.nombreEmprendimiento,
        })
     }else {
        res.status(400)
        throw new Error('Invalid user data')
     }

     const savedProduct = await product.save();
     console.log(savedProduct);
})

//@route GET /api/product/getProduct
const getProduct = asyncHandler(async (req, res) => {
    try{
        const product = await Product.find()
        console.log(product)
        if (product) {
            res.json(product)
        }else {
            res.status(402)
            throw new Error('Invalid no found')
        }
    }
    catch(error){
        console.log(error)
    }
})

//@desc   update product
//@route PUT /api/product/:id
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status (400)
        throw new Error('Product not found')
    }

    /*Chaeck for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    Make sure the logged in user maches the goal user
    if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not autorized')
    }*/

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedProduct)
})

//@desc   Delete goal
//@route DELETE /api/goals/:id
//@acess Private
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status (400)
        throw new Error('Product not found')
    }

    //Chaeck for user
    // if(!req.user){
    //     res.status(401)
    //     throw new Error('User not found')
    // }

    // //Make sure the logged in user maches the goal user
    // if(product.user.toString() !== req.user.id){
    //     res.status(401)
    //     throw new Error('User not autorized')
    // }

    await Product.findByIdAndDelete(product)

    res.status(200).json({ id: req.params.id })
})



module.exports = {
    registerInvestor,
    loginInvestor,
    updateInvestor,
    deleteInvestor,
    //
    registeAdministrator,
    loginAdministrator,
    updateAdministrator,
    //
    registerUser,
    loginUser,
    getMe,
    updateUser,
    deleteUser,
    //
    registerUserE,
    loginUserE,
    getMeE,
    updateUserE,
    deleteUserE,
    //
    getRol,
    //
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
}