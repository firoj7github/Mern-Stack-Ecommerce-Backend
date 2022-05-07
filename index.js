const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000 ;
const app = express();



// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wxvas.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
    await client.connect();
    const serviceCollection = client.db("wirehouse").collection("service");
    app.get('/service', async(req,res)=>{
    const query = {};
    const cursor = serviceCollection.find(query);
    const services = await cursor.toArray();
    res.send(services);
   })
  //  post
    app.post('/service', async(req,res)=>{
    const newService = req.body;
    console.log(newService);
    const result = await serviceCollection.insertOne(newService);
    res.send(result);

  })
    
  }
  finally{

  }

}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('wirehouse server running');
})

app.listen(port, () => {
    console.log('listening on port', port );
  })