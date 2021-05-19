const express = require('express');
const server = express();

server.use(express.json());

// BD CONNECTION
const MongoClient = require('mongodb').MongoClient;
const { ObjectID, Timestamp } = require('mongodb');

const uri = "mongodb+srv://chroot:chroot123@cluster.tvznb.mongodb.net/ine5612?retryWrites=true&w=majority";

MongoClient.connect(uri, (err, client) => {
  if (err) return console.log(err)
  db = client.db('ine5612')
})


// READ
server.get('/', (req, res) => {
  const cursor = db.collection('backend').find().toArray()
  .then(result => {
    return res.json(result)
  })
  .catch(error => console.error(error))
})


// CREATE
server.post('/novo', (req, res) => {
  
  db.collection('backend').insertOne({...req.body, Timestamp: new Date()}, ((err, result) => {

    if(err) return console.log(err)
    return res.status(200).json('Novo registro criado com sucesso.');
  
  }))
})


// DELETE
server.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  db.collection('backend').deleteOne({_id: ObjectID(id)}, (err, result) => {
    if(err) return res.send(500, err)

    return res.status(200).json('Registro excluído com sucesso.');

  })
})


// SERVER
server.listen(3000, console.log(`Servidor no ar na porta 3000...`));