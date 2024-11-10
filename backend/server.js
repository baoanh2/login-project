const mysql = require('mysql2')
const express = require('express')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'24112002',
    database:'loginsystem'
})

// app.get('/register',(req,res)=>{
//     const id = req.body.id;
//     db.query('SELECT * FROM `users` WHERE id=3',[id],(err,result)=>{
//         if(err) console.log(err);
//         return res.json(result)
//     })
// })
db.connect(function(err)  {
    if (err) throw err;
    console.log("Connected!");
})

app.post('/register',(req,res)=>{
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    const sql = 'INSERT INTO `register` (fullname, email, password) VALUES (?,?,?)';
    db.query(sql,[fullName,email,password],(err,result)=>{
        if (err) return console.log(err);
    })
})

app.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const sql = 'SELECT * FROM `register` WHERE email = ? AND password =? ';
    db.query(sql,[email,password],(err,result)=>{
        if (err) return console.log(err);
        res.send(result);
    })
})

app.listen(3001,function(err){
    if(err) console.log(err);
    console.log('listening');
})