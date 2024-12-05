const argon2 = require('argon2')
const pool = require('../db')
const jwt = require('jsonwebtoken');
require('dotenv').config();


class UserController {

    async getAllUsers(req,res) {
        try{
            const user = await pool.query(`SELECT * FROM users`)
            res.json(user.rows)
        } catch(error){
            console.log(error)
        }
    }

    async getUserById(req, res){
        const id = req.params.id
        try{
            const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
            res.json(user.rows)
        } catch (error){
            console.error('error', error)
        }
    }

    async createUser(req, res){
        const {username, email, password} = req.body
        const hashedPassword = argon2.hash(password)
        try{
            const user = await pool.query(`INSERT INTO users (username, email, password) VALUES ($1,$2, $3) RETURNING *`, [username, email, hashedPassword]) 
            res.json(user.rows)
        } catch (error) {
            console.error('error', error)
        }
    }

    async updateUser(req,res) {
        const id = parseInt(req.params.id, 10)
        const {username, email, password} = req.body
        try{
            const user = await pool.query(`UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *`, [username, email, password, id])
            res.json(user.rows)
        } catch (error){
            console.error('error', error)
        }
    }

    async deleteUser(req,res) {
        const id = req.params.id
        const user = await pool.query(`DELETE FROM users WHERE id = $1`, [id])
        res.json(user.rows[0])
    }

    // async authUser(req,res){
    //     try{
    //     const {email, password} = req.body
    //         const emails = await pool.query(`SELECT * FROM users WHERE email = $1 and password = $2`, [email, password])
    //         if (emails.rows[0])
    //             res.json({message: "Вы авторизировались!"})
    //         else
    //             res.json({message:"Неверные данные!"})
    //     }catch{
    //             console.error('error', error)
    //     }
    // }
    async authUser (req, res){
        const {email, password} = req.body
        try {
          const user = await pool.query(`SELECT * FROM users WHERE email = $1 and password = $2`, [email, password]);    
            if (user.rows[0]){
                const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
                res.status(200).json({ message: 'Login successful', token });
              }
              else return res.status(400).json({ message: 'Invalid credentials' });
        } catch (err) {
          res.status(500).json({ message: 'Error logging in', error: err.message });
        }
      };
}

module.exports = new UserController()
