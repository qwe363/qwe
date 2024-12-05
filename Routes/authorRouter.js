const Router = require('express')
const router = new Router()
const authorController = require('../Controllers/authorController')

router.get('/author', authorController.getAllAuthors)
router.get('/author/:id', authorController.getAuthorById)
router.post('/author', authorController.createAuthor)
router.put('/author/:id', authorController.updateAuthor)
router.delete('/author/:id', authorController.deleteAuthor)

module.exports = router