const ApiError = require("../error/ApiError")
const {Movie, Director, Actor} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const {Op} = require('sequelize')
const {unlink, fstat} = require('fs')

class MovieController{
    async create(req, res, next){
        try {
            let {title, origTitle, country, rate, description, duration, ageLimit, startYear, startDate, genres, directors, actors} = req.body
            const {img} = req.files
            if (typeof directors === 'string') directors = [directors]
            if (typeof actors === 'string') actors = [actors]
            let fileName = uuid.v4() + '.jpg'
            const movie = await Movie.create({title, origTitle, country, rate, description, startYear, ageLimit, duration, startDate, genres, img:fileName})
            directors.forEach(director => {                
                Director.findByPk(director)
                .then(director=>{
                    if(!director) return;
                    movie.addDirector(director)
                })
            })
            actors.forEach(actor => {                
                Actor.findByPk(actor)
                .then(actor=>{
                    if(!actor) return;
                    movie.addActor(actor)
                })
            })
            img.mv(path.resolve(__dirname, '..', 'static', fileName))            
            return res.json(movie)

        }
        catch(e) {
            next(ApiError.badRequest(e.message))
        }        
    }

    async getAll(req,res){        
        let {genre, page, limit} = req.query
        page = page || 1
        limit = limit || 8
        let offset = page*limit - limit
        let movies
        if (!genre){
            movies = await Movie.findAndCountAll({limit, offset})
        }
        if (genre){
            movies = await Movie.findAndCountAll( {where:
                { genres: {[Op.contains]: [genre]} },
                limit, offset
            })
        }
        return res.json(movies)  
    }

    async getOne(req, res, next){
        const {id} = req.params
        const movie = await Movie.findOne(
            {where: {id},
             include:[{model: Director,
                       attributes: ['name'], 
                       through: {attributes: [] }
                      },
                     {model: Actor,
                      attributes:['name'],
                      through: {attributes: []}}]
            }
        )
        if (movie === null) {
            return next(ApiError.badRequest('Неверно указан ID'))
        }
        else {
            return res.json (movie) 
        }
    }

    async deleteOne(req, res, next){
        const {id} = req.params
        const movie = await Movie.findByPk(id);
        if (movie === null) {
            return next(ApiError.badRequest('Неверно указан ID'))
        } 
        else {
            unlink(path.resolve(__dirname, '..', 'static', movie.img), (err) => {
                if(err) return next(ApiError.badRequest('Ошибка в удалении файлов'))
            })
            await movie.destroy()
            return res.json('Удален фильм с id ' + id)        
        }
    }
}

module.exports = new MovieController()