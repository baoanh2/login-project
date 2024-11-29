const express = require('express')
const router = express.Router()

const controller = require("../controllers/BookingController")
router.get('/getAllBooking',controller.getAll)
router.get('/getUserBooking/:userid',controller.getByUserId)
router.post('/addBooking',controller.add)
router.put('/cancel-booking/:id',controller.cancel)

module.exports =router;