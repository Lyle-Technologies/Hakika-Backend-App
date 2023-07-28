const {registerUser, verifyEmailToken} = require("../controllers/userController");
const router = require('express').Router()

router.post('/', registerUser)
router.get('/:id/verify/:token', verifyEmailToken)

module.exports = router