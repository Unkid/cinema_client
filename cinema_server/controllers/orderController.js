const { Order, SelectedSeat, Seance, Client, Movie, Hall, Cinema } = require("../models/models")
const moment = require('moment')
const ApiError = require("../error/ApiError")

class OrderController{
    async create(req,res,next){
        try{
            const {seanceId, selectedSeatId, clientId} = req.body
            const oldBasket = await Order.findOne({
                where: {seanceId, selectedSeatId}
            })
            if (oldBasket!==null)
                return next(ApiError.badRequest('Упс, данные места уже куплены'))
            const now = moment().format('YYYY-MM-DD HH:mm:ss')
            const seance = await Seance.findOne(
                {
                    where: {id: seanceId},
                    attributes: ['price']
                }
            )
            const seats = await SelectedSeat.findOne(
                {
                    where: {id:selectedSeatId},
                    attributes: ['seats']})
            const price = seance.price * seats.seats.length
            const basket = await Order.create({price:price, date:now, seanceId, selectedSeatId, clientId})
            return res.json(basket)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req,res,next){
        try{
            const {id} = req.params
            const order = await Order.findOne(
                {where: {id},
                 include:[{model: Seance,
                            attributes:['time', 'price', 'format'],
                            include: [
                            {model: Movie,
                            attributes: ['title', 'ageLimit', 'img']},
                            {model: Cinema,
                            attributes:['title','adress']},
                            {model: Hall,
                            attributes: ['number']}
                        ]},
                         {model: SelectedSeat,
                            attributes:['seats']},
                        {model: Client,
                            attributes:['email']}                        
                        ]                   
                }
            )
            if (order===null)
                return next(ApiError.badRequest('Упс, заказ не найден'))
            return res.json(order)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteOne(req,res,next){
        const {id} = req.params
        const order = await Order.findByPk(id);
        if (basket === null) {
            return next(ApiError.badRequest('Удаление не было совершенно, неверное указан ID'))
        } 
        else {
            await order.destroy()
            return res.json('Удален заказ с id ' + id)        
        }

    }
}

module.exports = new OrderController()