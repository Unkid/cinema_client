const Router = require('express')
const router = new Router()
const cinemaController = require('../controllers/cinemaController')

router.get('/:id', cinemaController.getOne)
router.get('/', cinemaController.getAll)
router.post('/', cinemaController.create)
router.delete('/:id', cinemaController.deleteOne)

module.exports = router