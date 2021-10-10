const Router = require('express')
const router = new Router()
const clientController = require('../controllers/clientController')

router.get('/:id', clientController.getOne)
router.post('/', clientController.create)
router.delete('/:id', clientController.deleteOne)

module.exports = router