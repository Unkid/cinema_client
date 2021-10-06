const ApiError = require("../error/ApiError")
const {Cinema} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const {Op} = require('sequelize')
const {unlink, fstat} = require('fs')

class CinemaController{
    async create(req,res){
        const {title, adress, phone} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + '.jpg'
        const cinema = await Cinema.create({title, adress, phone, fileName})
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        return res.json(cinema)
    } 

    async getAll(req,res){
        const cinemas = await Cinema.findAll()
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
            unlink(path.resolve(__dirname, '..', 'static', cinema.img), (err) => {
                if(err) return next(ApiError.badRequest('Ошибка в удалении файлов'))
            })
            await cinema.destroy()
            return res.json('Удален кинотеатр с id ' + id)        
        }
    }
}

module.exports = new CinemaController()