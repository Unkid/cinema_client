const Router = require('express')
const router = new Router()
const directorController = require('../controllers/directorController')

router.get('/:id',directorController.getOne)
router.post('/', directorController.create)
router.delete('/:id', directorController.deleteOne)

module.exports = router