const Router = require('express')
const router = new Router()
const seanceController = require('../controllers/seanceController')

router.get('/:id',seanceController.getOne)
router.get('/',seanceController.getAll)
router.post('/',seanceController.create)
router.delete('/:id',seanceController.deleteOne)

module.exports = router