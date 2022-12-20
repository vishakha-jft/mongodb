const mongoose = require('mongoose')
//var url = 'mongodb://127.0.0.1/employeedb'
var url= "mongodb+srv://vishakha:vishakha@employeedb.yqpxji0.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url)
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error"))
db.once("open",()=>{console.log("connected succesfully");})
const employeeschema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    job:{
        type:String
    },
    salary: {
      type: Number,
      default: 1000,
    },
  });
const emps = mongoose.model("emps",employeeschema)
function findall(){
    return new Promise((resolve,reject)=>{
        const rows = emps.find()
        resolve(rows)
    })
} 

function findbyid(id){
    return new Promise((resolve,reject)=>{
        const row = emps.findById(id)
        resolve(row)
    })    
}
function create(emp){
    return new Promise((resolve,reject)=>{
        const row = emps.insertMany(emp)
        resolve(row)
    })
}
function update(id,emp){
    console.log(id);
    return new Promise((resolve,reject)=>{
        const row = emps.findByIdAndUpdate(id,emp)
        resolve(row)
    })
}
 
function remove(id){
    return new Promise((resolve,reject)=>{
        const row = emps.findByIdAndDelete(id)
        resolve(row)
    })
}
module.exports={
      findall,findbyid,create,update,remove
}