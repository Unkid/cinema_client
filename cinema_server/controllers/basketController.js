const {SelectedSeat, Cinema, Movie, Hall, Seance} = require('../models/models')
const ApiError = require("../error/ApiError")

class BasketController{
    async create(req,res,next){
        try{
            const {seats, seanceId} = req.body
            const basket = await SelectedSeat.create({seats, seanceId})
            return res.json(basket)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
    
    async getOne(req,res,next){
        try{
            const {id} = req.params
            const basket = await SelectedSeat.findOne(
                {where: {id},
                 include:{model: Seance,
                          attributes:['time', 'price', 'format'],
                          include: [
                            {model: Movie,
                            attributes: ['title', 'ageLimit', 'img']},
                            {model: Cinema,
                            attributes:['title','adress']},
                            {model: Hall,
                            attributes: ['number']}
                        ]}                                            
                }
            )
            if (basket===null)
                return next(ApiError.badRequest('Упс, места не найден'))
            return res.json(basket)
        }
        catch(e){
            return next(ApiError.badRequest(e.message))
        }

    }

    async deleteOne(req,res){
        const {id} = req.params
        const basket = await SelectedSeat.findByPk(id);
        if (basket === null) {
            return next(ApiError.badRequest('Удаление не было совершенно, неверное указан ID'))
        } 
        else {
            await basket.destroy()
            return res.json('Удалена бронь мест с id ' + id)        
        }
    }
}

module.exports = new BasketController()