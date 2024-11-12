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
    methods:["POST","GET"],
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
            next();
        }

        })
    }

}

app.get('/',verifyUser,(req,res)=>{
    return res.json({Status:"Success",role:req.role})
    
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
                    const token = jwt.sign({role},"jwt-secret-key",{expiresIn:"1d"});
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

app.listen('3001',(req,res)=>{
    console.log('listening')
})
