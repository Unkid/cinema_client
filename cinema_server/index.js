require('dotenv').config()
const express = require('express');
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandling')
const fileUpload = require('express-fileupload')
const path = require('path')

const app = express();

app.set('port', process.env.PORT || 5000);

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)


// последний обработчик
app.use(errorHandler)


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


