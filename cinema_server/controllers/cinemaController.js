const ApiError = require("../error/ApiError")
const {Cinema} = require('../models/models')

class CinemaController{
    async create(req,res){
        const {title, adress, phone, img} = req.body
        const cinema = await Cinema.create({title, adress, phone, img})
        return res.json(cinema)
    } 

    async getAll(req,res){
        const cinemas = await Cinema.findAll()
        console.log(cinemas)
        return res.json(cinemas)        
    }       

    async getOne(req,res, next){
        const {id} = req.params
        const cinema = await Cinema.findByPk(id);
        if (cinema === null) {
            return next(ApiError.badRequest('Неверно указан ID'))
        }
        else {
            return res.json(cinema) 
        }

    }

    async deleteOne(req,res, next){
        const {id} = req.params
        const cinema = await Cinema.findByPk(id);
        if (cinema === null) {
            return next(ApiError.badRequest('Неверно указан ID'))
        } 
        else {
            await cinema.destroy()
            return res.json('Удален кинотеатр с id ' + id)        
        }
    }
}

module.exports = new CinemaController()