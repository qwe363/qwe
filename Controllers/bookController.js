const pool = require('../db')

class BookController {

    async getAllBooks(req,res) {
        try{
            const book = await pool.query(`SELECT * FROM book WHERE id = $1`, [id])
            res.json(book.rows)
        } catch(error){
            console.log(error)
        }
    }

    async getBookById(req, res){
        const id = req.params.id
        try{
            const book = await pool.query(`SELECT id, title, name, surname, genre, status, loan_date FROM book JOIN authors ON book.author_id = authors.author_id`)
            res.json(book.rows)
        } catch (error){
            console.error('error', error)
        }
    }

    async createBook(req, res){
        const {title, author_id, genre, status} = req.body
        try{
            const book = await pool.query(`INSERT INTO book (title, author_id, genre, status) VALUES ($1, $2, $3, $4) RETURNING *`, [title, author_id, genre, status]) 
            res.json(book.rows)
        } catch (error) {
            console.error('error', error)
        }
    }

    async updateBook(req,res) {
        const id = parseInt(req.params.id, 10)
        const {title, author_id, genre, status} = req.body
        try{
            const book = await pool.query(`UPDATE book SET title = $1, author_id = $2, genre = $3, status = $4 WHERE id = $5 RETURNING *`, [title, author_id, genre, status,id])
            res.json(book.rows)
        } catch (error){
            console.error('error', error)
        }
    }

    async deleteBook(req,res) {
        const id = req.params.id
        const book = await pool.query(`DELETE FROM book WHERE id = $1`, [id])
        res.json(book.rows[0])
    }
}

module.exports = new BookController()