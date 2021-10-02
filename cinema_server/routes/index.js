const Router = require('express')
const movieRouter = require('./movieRouter')
const actorRouter = require('./actorRouter')
const cinemaRouter = require('./cinemaRouter')
const seanceRouter = require('./seanceRouter')
const orderRouter = require('./orderRouter')
const basketRouter = require('./basketRouter') 
const router = new Router()

router.use('/movie', movieRouter)
router.use('/actor', actorRouter)
router.use('/cinema', cinemaRouter)
router.use('/seance', seanceRouter)
router.use('/order', orderRouter)
router.use('/basket', basketRouter)

module.exports = router