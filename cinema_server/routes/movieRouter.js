const Router = require('express')
const router = new Router()
const movieController = require('../controllers/movieController')

router.get('/:id', movieController.getOne)
router.get('/', movieController.getAll)
router.post('/',movieController.create)
router.put('/:id',movieController.update)
router.delete('/:id',movieController.deleteOne)

module.exports = router