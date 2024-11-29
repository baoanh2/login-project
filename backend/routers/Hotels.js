const express = require('express')
const router = express.Router()
const controller = require("../controllers/HotelsController")

router.get('/gethotels',controller.getAll)
router.get('/gethotel/:id',controller.getById)
router.put('/update-hotel/:id',controller.update)
router.post('/addroom',controller.add)
router.delete('/delete/:id',controller.delete)

module.exports =router;
