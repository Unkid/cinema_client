const ApiError = require("../error/ApiError")
const {Seance, Movie, Hall, Cinema} = require('../models/models')

class SeanceController{
    async create(req,res,next){
        try{
            const {price, date, time, format, movieId, cinemaId, hallId} = req.body
            const seance = await Seance.create({price, date, time, format, movieId, cinemaId, hallId})
            return res.json(seance)
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
        const seances = await Seance.findAndCountAll({limit, offset})
        return res.json(seances)
    }

    async getOne(req,res,next){
        try{
            const {id} = req.params
            const seance = await Seance.findOne(
                {where: {id},
                 include:[{model: Hall,
                           attributes: ['number','rows', 'seats']                          
                          },
                         {model: Movie,
                          attributes:['title', 'ageLimit', 'duration']},
                         {model: Cinema,
                            attributes:['title']}
                        ]                    
                }
            )
            return res.json(seance)
        }
        // сделать проверку seance==null
        catch(e){
            return next(ApiError.badRequest('Упс, сеанс не найден'))
        }

    }

    async deleteOne(req,res,next){
        const {id} = req.params
        const seance = await Seance.findByPk(id);
        if (seance === null) {
            return next(ApiError.badRequest('Удаление не было совершенно, неверное указан ID'))
        } 
        else {
            await seance.destroy()
            return res.json('Удален сеанс с id ' + id)        
        }
    }
}

module.exports = new SeanceController()