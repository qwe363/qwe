const Router = require('express')
const router = new Router()
const userController = require('../Controllers/userController')
const authMiddleware = require('../authMiddleware')

router.get('/user', userController.getAllUsers)
router.get('/user/:id', userController.getUserById)
router.post('/user', userController.createUser)
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)
router.post('/user/register', userController.authUser)
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.id}!` });
});

module.exports = router