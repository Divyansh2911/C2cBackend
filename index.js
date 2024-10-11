const express = require("express");
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const {getUser,getUserById,getMap,createUser,editUser,getItems,getItemById,getItemByOwnId,createItems,deleteItem} = require('./components')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
dotenv.config({path : `${__dirname}/config.env`})

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)


// const uri = "mongodb+srv://ds290720021:0Jnpg0E3nXXBQqBo@cluster0.tdilthm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// mongoose.connect(db,{
//     useNewUrlParser:true,
// }).then((val)=>{
//     // console.log(val.connections);
//     // console.log(db.Connection);
//     console.log("DB connected");
// }).catch((err) => {
//     console.log("DB connection failed"+err.message)
// });
app.get('/api/users', getUser);
app.get('/api/users/:id',getUserById)
app.get('/api/users/google',getMap)
app.post('/api/users', createUser);
app.put('/api/users/:id', editUser)
app.get('/api/items', getItems);
app.get('/api/items/:Id',getItemById)
app.get('/api/items/own/:id',getItemByOwnId)
app.post('/api/items', createItems);
app.delete('/api/items/:id',deleteItem);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Listening to port on server http://localhost:5000")
})