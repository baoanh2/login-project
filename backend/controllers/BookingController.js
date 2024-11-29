const express = require('express')
require('dotenv').config();

const mysql = require('mysql2')
const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
})
const app = express();
app.use(express.json())
db.connect((err)=>{
    if(err) console.log(err);
    console.log('Connected')
})

module.exports={
    getAll:(req,res)=>{
        const sql = "SELECT * FROM `booking-list`";
        db.query(sql,(err,data)=>{
            if(err) res.json({Error: "Error in getting booking data"});
            return res.send(data);
        })
    },
    getByUserId:(req,res)=>{
        const userid=req.params.userid;
        const sql = "SELECT * FROM `booking-list` WHERE userid=?";
        db.query(sql,[userid],(err,data)=>{
            if(err) res.json({Error: "Error in getting booking data"});
            return res.send(data);
        })
    },
    add:(req,res)=>{
        const userid = req.body.userid;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const totalMoney = req.body.totalMoney;
        const totalday = req.body.day;
        const status = "Success";
        const values = [userid,startDate,endDate,totalday,totalMoney,status]
        const sql = 'INSERT INTO `booking-list` (userid,startdate,enddate,totalday,totalamount,status) VALUES (?,?,?,?,?,?)';
        db.query(sql,values,(err,result)=>{
            if (err) res.json({Error: "Error in insert to database"});
            return res.json({Status:"Success"})
        })
    },
    cancel:(req,res)=>{
        const id = req.params.id;
        const status = "Cancel";
        const values = [status,id]
        const sql = 'UPDATE `booking-list` SET status=? WHERE (bookid=?)';
        db.query(sql,values,(err,result)=>{
            if (err) {return res.json({Error:"Error in cancel booking"});}
            return res.json({Status:"Cancel Success"});
        })
    }
}