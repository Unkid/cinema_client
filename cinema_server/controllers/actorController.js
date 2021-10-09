const ApiError = require("../error/ApiError")
const {Actor, Movie} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const {Op} = require('sequelize')
const {unlink, fstat} = require('fs')

class ActorController{
    async create(req,res){
        const {name, gender, birthDate, country} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + '.jpg'
        const actor = await Actor.create({name, gender, birthDate, country, img:fileName})
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        return res.json(actor)
    }   
    
    async update(req,res,next){
        try{
            const {id} = req.params
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            const actor = await Actor.update({img:fileName},
                { where: { id: id}}
            )
            img.mv(path.resolve(__dirname, '..', 'static', fileName))            
            return res.json(actor)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req,res, next){
        const {id} = req.params
        const actor = await Actor.findOne(
            {where: {id},
             include:{model: Movie,
                       attributes: ['title', 'img'], 
                       through: {attributes: [] }
                     }                     
            }
        );
        if (actor === null) {
            return next(ApiError.badRequest('Неверно указан ID'))
        }
        else {
            return res.json(actor) 
        }

    }

    async deleteOne(req,res, next){
        const {id} = req.params
        const actor = await Actor.findByPk(id);
        if (actor === null) {
            return next(ApiError.badRequest('Неверно указан ID'))
        } 
        else {
            unlink(path.resolve(__dirname, '..', 'static', actor.img), (err) => {
                if(err) return next(ApiError.badRequest('Ошибка в удалении файлов'))
            })
            await actor.destroy()
            return res.json('Удален актер с id ' + id)        
        }
    }
}

module.exports = new ActorController()