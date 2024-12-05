const Router = require('express')
const router = new Router()
const bookController = require('../Controllers/bookController')

router.get('/book', bookController.getAllBooks)
router.get('/book/:id', bookController.getBookById)
router.post('/book', bookController.createBook)
router.put('/book/:id', bookController.updateBook)
router.delete('/book/:id', bookController.deleteBook)


module.exports = router