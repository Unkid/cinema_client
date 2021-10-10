const ApiError = require("../error/ApiError")
const {Client, Order} = require('../models/models')

class ClientController{
    async create(req,res,next){
        try{
            const {name, email, phone} = req.body
            let client = await Client.findOne({
                where: {name, phone, email}
            })
            if (!client){
                client = await Client.create({name, email, phone})
                return res.json(client)
            }
            return res.json(client)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req,res,next){
        const {id} = req.params
        const client = await Client.findOne(
            {where: {id},
             include:{model: Order}                     
            }
        );
        if (client === null) {
            return next(ApiError.badRequest('Неверно указан ID'))
        }
        else {
            return res.json(client) 
        }
    }

    async deleteOne(req,res,next){
        const {id} = req.params
        const client = await Client.findByPk(id);
        if (client === null) {
            return next(ApiError.badRequest('Удаление не было совершенно, неверное указан ID'))
        } 
        else {
            await client.destroy()
            return res.json('Удален клиент с id ' + id)        
        }
    }
}

module.exports = new ClientController()