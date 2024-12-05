const pool = require('../db')

class GenreController{
    
    async getAllGenres(req,res) {
        try{
            const genre = await pool.query(`SELECT * FROM genres`)
            res.json(genre.rows)
        } catch(error){
            console.log(error)
        }
    }

    async getGenreById(req, res){
        const id = req.params.id
        try{
            const genre = await pool.query(`SELECT * FROM genres WHERE id = $1`, [id])
            res.json(genre.rows)
        } catch (error){
            console.error('error', error)
        }
    }

    async createGenre(req, res){
        const {name} = req.body
        try{
            const genre = await pool.query(`INSERT INTO genres (name) VALUES ($1) RETURNING *`, [name]) 
            res.json(genre.rows)
        } catch (error) {
            console.error('error', error)
        }
    }

    async updateGenre(req,res) {
        const id = parseInt(req.params.id, 10)
        const {name} = req.body
        try{
            const genre = await pool.query(`UPDATE genres SET name = $1 WHERE id = $2 RETURNING *`, [name,id])
            res.json(genre.rows)
        } catch (error){
            console.error('error', error)
        }
    }

    async deleteGenre(req,res) {
        const id = req.params.id
        const genre = await pool.query(`DELETE FROM genres WHERE id = $1`, [id])
        res.json(genre.rows[0])
    }
}

module.exports = new GenreController