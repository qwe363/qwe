const Router = require('express')
const router = new Router()
const authMiddleware = require('../')

router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.id}!` });
});

module.exports = router