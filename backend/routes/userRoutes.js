const express = require ('express')
const router = express.Router()
const { 
    registerinvestor,
    logininvestor,
    
    registeradministrator,
    loginadministrator,
    
    registerUser, 
    loginUser,
    getMe,

    registerUserE, 
    loginUserE,
    getMeE,

    getRol,

    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
 } = require ('../controllers/userController')
//  const {protect} = require ('../middleware/authMiddleware')

router.post('/registerUser', registerUser)
router.post('/login', loginUser)
router.get('/me', getMe)

router.post('/registerUserE', registerUserE)
router.post('/loginE', loginUserE)
router.get('/me', getMeE)

router.post('/rolUsers', getRol)

router.post('/registerProduct', createProduct)
router.get('/getProduct', getProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
// router.get('/me', protect, getMe)


module.exports = router