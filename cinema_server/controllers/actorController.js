const ApiError = require("../error/ApiError")
const {Actor} = require('../models/models')

class ActorController{
    async create(req,res){
        const {name, gender, birthDate, country, img} = req.body
        const actor = await Actor.create({name, gender, birthDate, country, img})
        return res.json(actor)
    }    

    async getOne(req,res, next){
        const {id} = req.params
        const actor = await Actor.findByPk(id);
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
            await actor.destroy()
            return res.json('Удален актер с id ' + id)        
        }
    }
}

module.exports = new ActorController()