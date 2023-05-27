const express = require ('express')
const router = express.Router()
const { registerUser, 
    loginUser,
    getMe,
    registerUserE, 
    loginUserE,
    getMeE,
    getRol,
 } = require ('../controllers/userController')
//  const {protect} = require ('../middleware/authMiddleware')

router.post('/registerUser', registerUser)
router.post('/login', loginUser)
router.get('/me', getMe)
router.post('/registerUserE', registerUserE)
router.post('/loginE', loginUserE)
router.get('/me', getMeE)
router.post('/rolUsers', getRol)
// router.get('/me', protect, getMe)


module.exports = router