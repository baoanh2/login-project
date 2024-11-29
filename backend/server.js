const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const app = express();

app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["POST","GET","DELETE","PUT"],
    credentials:true,
}));

app.use(cookieParser())
const verifyUser=(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json({Error:"You are not authenticated"})
    }else{
        jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
            if (err) {
                return res.json({Error:"Your token is not correct"})
            }else{
                req.id = decoded.id;
                req.name = decoded.name;
                req.email = decoded.email;
                req.role = decoded.role;
                next();
            }
        })
    }
}

const userRoute = require('./routers/User')
app.post('/register',userRoute)
app.post('/login',userRoute)
app.get('/logout',userRoute)
app.get('/getusers',userRoute)
app.get('/user/:id',userRoute)
app.get('/',verifyUser,userRoute)

const hotelRoute = require('../backend/routers/Hotels')
app.get('/gethotels',hotelRoute)
app.get('/gethotel/:id',hotelRoute)
app.put('/update-hotel/:id',hotelRoute)
app.post('/addroom',hotelRoute)
app.delete('/delete/:id',hotelRoute)

const bookingRoute = require('./routers/Booking')
app.get('/getAllBooking',bookingRoute)
app.put('/cancel-booking/:id',bookingRoute)
app.post('/addBooking',bookingRoute)
app.get('/getUserBooking/:userid',bookingRoute)


app.listen('3001',(req,res)=>{
    console.log('listening')
})
