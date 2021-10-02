const ApiError = require("../error/ApiError")
const {Movie} = require('../models/models')

class MovieController{
    async create(req,res){

    }

    async getAll(req,res,next){        
        const {id} = req.query
        console.log(id)
        if (!id) {
            return next(ApiError.badRequest('Не указан id'))
        }
        res.json('getAll')

    }

    async getOne(req,res){
        const {id} = req.query
        console.log(id)
        if (id!=4) {
            next(ApiError.badRequest('Не указан id'))
        }

    }

    async deleteOne(req,res){

    }
}

module.exports = new MovieController()