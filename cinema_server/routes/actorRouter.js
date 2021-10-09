const Router = require('express')
const router = new Router()
const actorController = require('../controllers/actorController')

router.get('/:id',actorController.getOne)
router.post('/', actorController.create)
router.put('/:id', actorController.update)
router.delete('/:id',actorController.deleteOne)

module.exports = router