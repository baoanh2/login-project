const mysql = require('mysql2')
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const salt = 10;
require('dotenv').config();

const app = express();
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["POST","GET","DELETE","PUT"],
    credentials:true,
}));
app.use(cookieParser())

const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
})

db.connect((err)=>{
    if(err) console.log(err);
    console.log('Connected')
})

const verifyUser=(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json({Error:"You are not authenticated"})
    }else{
        jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
        if (err) {
            return res.json({Error:"Your token is not correct"})
        }else{
            req.role = decoded.role;
            req.name = decoded.name;
            next();
        }

        })
    }

}

app.get('/',verifyUser,(req,res)=>{
    return res.json({Status:"Success",role:req.role,name:req.name})
    
})
app.post('/register',(req,res)=>{
    const fullname = req.body.fullName;
    const email = req.body.email;
    const role = req.body.role;
    const sql = 'INSERT INTO `userrole` (fullname, email,password,role) VALUES (?,?,?,?)';
    bcrypt.hash(req.body.password.toString(),salt,(err,hash)=>{
        if (err) return res.json({Error:"Error in hashing password"});
        db.query(sql,[fullname,email,hash,role],(err,result)=>{
            if (err) return res.json({Error:"Error in inserting data"});
            return res.json({Status:"Success"});
        })
    })
})

app.post('/login',(req,res)=>{
    const sql = 'SELECT * FROM `userrole` WHERE email = ?';
    db.query(sql,req.body.email,(err,data)=>{
        if(err) console.log(err);
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(),data[0].password,(err,response)=>{
                if(err) return res.json({Error:"Password compare error"});
                if(response) {
                    const role = data[0].role;
                    const name = data[0].fullname;
                    const token = jwt.sign({role,name},"jwt-secret-key",{expiresIn:"1d"});
                    res.cookie('token',token);
                    return res.json({Status:"Success"});
                }else{
                    return res.json({Error:"Password do not matched"});
                }
            })
        } else{
            return res.json({Error:"No email existed"});
        }
    })
})

app.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({Status:"Success"});
})


app.get('/getdetail/:id',(req,res)=>{
    const sql = 'SELECT * FROM `hotel-info` WHERE id = ?';
    const id = req.params.id;
    db.query(sql,[id],(err,data)=>{
        if(err) res.json({Error: "Error in getting detail"});
        return res.send(data);
    })
})
app.get('/getusers',(req,res)=>{
    const sql = 'SELECT * FROM `userrole`';
    db.query(sql,(err,data)=>{
        if(err) res.json({Error: "Error in getting data"});
        return res.send(data);
    })
})

app.get('/gethotels',(req,res)=>{
    const sql = 'SELECT * FROM `hotel-info`';
    db.query(sql,(err,data)=>{
        if(err) res.json({Error: "Error in getting data"});
        return res.send(data);
    })
})

app.get('/gethotel/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM `hotel-info` WHERE id=?";
    db.query(sql,[id],(err,data)=>{
        if(err) res.json({Error: "Error in getting hotel data"});
        return res.send(data);
    })
})

app.get('/getAllBooking',(req,res)=>{
    const sql = "SELECT * FROM `booking-list`";
    db.query(sql,(err,data)=>{
        if(err) res.json({Error: "Error in getting booking data"});
        return res.send(data);
    })
})

app.put('/update-hotel/:id',(req,res)=>{
    const id = req.params.id;
    const name = req.body.name;
    const capacity = req.body.capacity;
    const phone = req.body.phone;
    const type = req.body.type;
    const image = req.body.image;
    const description = req.body.description;
    const values = [name,capacity,phone,type,image,description,id]
    const sql = 'UPDATE `hotel-info` SET name=?,capacity=?,phonenumber=?,type=?,image=?,description=? WHERE (id=?)';
    db.query(sql,values,(err,result)=>{
        if (err) console.log(err);
        return res.json({Status:"Success"})
    })
})

app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "DELETE FROM `hotel-info` WHERE id = ?";
    db.query(sql,[id],(err,result)=>{
        if(err) res.json({Error: "Error in delete hotel data"});
        return res.send(result);
    })
})

app.post('/addroom',(req,res)=>{
    const name = req.body.name;
    const capacity = req.body.capacity;
    const phone = req.body.phone;
    const type = req.body.type;
    const rent = req.body.rent;
    const image = req.body.image;
    const description = req.body.description;
    const values = [name,capacity,phone,type,image,description,rent]
    const sql = 'INSERT INTO `hotel-info` (name,capacity,phonenumber,type,image,description,rent) VALUES (?,?,?,?,?,?,?)';
    db.query(sql,values,(err,result)=>{
        if (err) res.json({Error: "Error in insert to database"});
        return res.json({Status:"Success"})
    })
})

app.post('/booking',(req,res)=>{
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const totalMoney = req.body.totalMoney;
    const totalday = req.body.day;
    const status = "Success";
    const values = [startDate,endDate,totalday,totalMoney,status]
    const sql = 'INSERT INTO `booking-list` (startdate,enddate,totalday,totalamount,status) VALUES (?,?,?,?,?)';
    db.query(sql,values,(err,result)=>{
        if (err) res.json({Error: "Error in insert to database"});
        return res.json({Status:"Success"})
    })
})
app.listen('3001',(req,res)=>{
    console.log('listening')
})
