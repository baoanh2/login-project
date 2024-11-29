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
    getAll: (req,res)=>{
        const sql = 'SELECT * FROM `hotel-info`';
        db.query(sql,(err,data)=>{
            if(err) res.json({Error: "Error in getting data"});
            return res.send(data);
        })
    },
    getById:(req,res)=>{
        const id = req.params.id;
        const sql = "SELECT * FROM `hotel-info` WHERE id=?";
        db.query(sql,[id],(err,data)=>{
            if(err) res.json({Error: "Error in getting hotel data"});
            return res.send(data);
        })
    },
    update:(req,res)=>{
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
            if (err) {
                return res.json({Error:"Error in update hotel data"});
            }
            else{
                return res.json({Status:"Success"});
            };
        })
    },
    add:(req,res)=>{
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
    },
    delete: (req,res)=>{
        const id = req.params.id;
        const sql = "DELETE FROM `hotel-info` WHERE id = ?";
        db.query(sql,[id],(err,result)=>{
            if(err) res.json({Error: "Error in delete hotel data"});
            return res.send(result);
        })
    }
}