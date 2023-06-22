const express = require ('express')
const router = express.Router()
const { 
    registerInvestor,
    loginInvestor,

    registeAdministrator,
    loginAdministrator,
    
    registerUser, 
    loginUser,
    getMe,
    updateUser,
    deleteUser,

    registerUserE, 
    loginUserE,
    updateUserE,
    getMeE,

    getRol,

    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
 } = require ('../controllers/userController')
//  const {protect} = require ('../middleware/authMiddleware')

//Usuario cliente
router.post('/registerUser', registerUser)
router.post('/login', loginUser)
router.get('/me', getMe)
router.put('/client/:id', updateUser)
router.delete('/client/:id', deleteUser)

//Emprendimiento
router.post('/registerUserE', registerUserE)
router.post('/loginE', loginUserE)
router.put('/clientE/:id', updateUserE)
router.get('/me', getMeE)

//Invercionista
router.post('/registerInvestor', registerInvestor)
router.post('/loginInvestor', loginInvestor)

//Administrador
router.post('/registeAdministrator', registeAdministrator)
router.post('/loginAdministrator', loginAdministrator)

//roles
router.post('/rolUsers', getRol)

//Producto
router.post('/registerProduct', createProduct)
router.get('/getProduct', getProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
// router.get('/me', protect, getMe)


module.exports = router
