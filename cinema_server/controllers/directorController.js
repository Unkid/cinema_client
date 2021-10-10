const ApiError = require("../error/ApiError")
const {Director, Movie} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const {unlink, fstat} = require('fs')

class DirectorController{
    async create(req,res){
        const {name, gender, birthDate, country} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + '.jpg'
        const director = await Director.create({name, gender, birthDate, country, img: fileName})
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        return res.json (director)
    }
    
    async update(req,res,next){
        try{
            const {id} = req.params
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            const director = await Director.update({img:fileName},
                { where: { id: id}}
            )
            img.mv(path.resolve(__dirname, '..', 'static', fileName))            
            return res.json(director)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req,res, next){
        const {id} = req.params
        const director = await Director.findOne(
            {where: {id},
             include:{model: Movie,
                       attributes: ['title', 'img'], 
                       through: {attributes: [] }
                      }                     
            }
        );
        if (director === null) {
            return next(ApiError.badRequest('Неверно указан ID'))
        }
        else {
            return res.json (director) 
        }
    }
            
    async deleteOne(req,res, next){
        const {id} = req.params
        const director = await Director.findByPk(id);
        if (director === null) {
            return next(ApiError.badRequest('Неверно указан ID'))
        } 
        else {
            unlink(path.resolve(__dirname, '..', 'static', director.img), (err) => {
                if(err) return next(ApiError.badRequest('Ошибка в удалении файлов'))
            })
            await director.destroy()
            return res.json('Удален режиссер с id ' + id)        
        }
    }
}

module.exports = new DirectorController()