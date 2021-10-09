const ApiError = require("../error/ApiError")
const {Cinema, Seance, Movie} = require('../models/models')
const moment = require('moment')
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
    
    async update(req,res,next){
        try{
            const {id} = req.params
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            const cinema = await Cinema.update({img:fileName},
                { where: { id: id}}
            )
            img.mv(path.resolve(__dirname, '..', 'static', fileName))            
            return res.json(cinema)

        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req,res){
        let {page, limit} = req.query
        page = page || 1
        limit = limit || 8
        let offset = page*limit - limit
        const cinemas = await Cinema.findAndCountAll({limit, offset})
        return res.json(cinemas)      
    }       

    async getOne(req,res, next){
        const {id} = req.params
        let {date} = req.query
        if (!date) {
            date = moment().format('YYYY-MM-DD')
        }
        const cinema = await Cinema.findOne(
            {where: {id}})
        const seances = await cinema.getSeances({
            where: {date: date},
            attributes:['price', 'time', 'format'],
            include: {
                model: Movie,
                attributes: ['title', 'img', 'ageLimit'] } 
            })
        if (cinema === null) {
            return next(ApiError.badRequest('Упс, кинотеатр не найден'))
        }
        else {
            return res.json({cinema, seances}) 
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