const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
//accept data in json format
app.use(express.json())


const PORT = process.env.PORT || 8080

//schema
const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: String
}, {
    timeStamps: true
})

//model
const userModel = mongoose.model("user", schemaData) //collection name jo hota hai inside your database us collection ka naam 'user' hoga




//read
app.get('/', async (req, res) =>{
    const data = await userModel.find({})
    res.json({success: true, data: data})
})

//create data || save data in mongodb
app.post("/create", async (req, res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
   res.json({success : true, message : 'message saved successfully', data: data})
})

//for update we use the "put method in node"
app.put('/update', async (req, res)=>{
    console.log(req.body)
    const{id,...rest} = req.body
    console.log(rest)

   const data = await userModel.updateOne({ _id : req.body.id},rest)
    res.send({success: true, message:'data updated successfully', data: data})
})

//delete a user data fully 
app.delete('/delete/:id_ek_variable_hai', async (req, res)=>{
    const id = req.params.id_ek_variable_hai;
    console.log(id)
    const data = await userModel.deleteOne({_id: id})
    res.send({success: true, message:'data deleted successfully', data: data})
})



mongoose.connect("mongodb://127.0.0.1:27017/databaseName")
.then(()=>{
    console.log('Connected to database...')
     app.listen(PORT, ()=>{console.log('Server is running...')})
})
.catch((error)=>{console.log(error)})
