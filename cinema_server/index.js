require('dotenv').config()
const express = require('express');
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')

const app = express();

app.set('port', process.env.PORT || 5000);

app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {
    res.status(200).json({message: 'WORKING!'})
})

const start = async() => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(app.get('port'), ()=> {
            console.log('Express запущен на localhost:'+
            app.get('port')+ '; Нажмите Ctrl+C для завершения')
        })
    }
    catch(e){
        console.log(e)

    }
}

start()


