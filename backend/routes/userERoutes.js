const express = require ('express')
const router = express.Router()
const { registerUserE, 
    loginUserE,
    getMe,
 } = require ('../controllers/userEController')
 const {protect} = require ('../middleware/authMiddleware')

router.post('/registerUserE', registerUserE)
router.post('/login', loginUserE)
router.get('/me', protect, getMe)


module.exports = router