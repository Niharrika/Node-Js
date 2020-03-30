const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoClient = require ('mongodb');
const url = "mongodb://localhost:27017";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.get('/',function(req,res){
	mongoClient.connect(url,function(err,client){
		if (err) throw err;
		var db = client.db("demoDb");
		var a = db.collection("user").findOne().toArray();
		a.then(function(data){
			client.close();
			res.json(data)
		}).catch(function(err){
			client.close();
			res.status(400).json({
				message : "Error"
			})
		})
	})
})

app.post('/users',function(req,res){
	console.log(req.body);
	mongoClient.connect(url,function(err,client){
		if (err) throw err;
		var db = client.db("demoDb");
		db.collection("user").insertOne(req.body,function(err,data){
			if (err) throw err;
			client.close();
			console.log("data stored")
			res.send(data)
		})
	})
})

app.put('/users',function(req,res){
	mongoClient.connect(url,function(err,client){
		if (err) throw err;
		var db = client.db("demoDb");
		var find = { name: "Niharrika" };
		var newval = { $set: { name: "Niha", email: "niharrikashreerao" } };
		db.collection("user").updateOne(find, newval, function(err, data) {
			if (err) throw err;
			client.close();
			console.log("document updated")
			res.send(data)
		})
	})
})

app.delete('/users',function(req,res){
	mongoClient.connect(url,function(err,client){
		if (err) throw err;
		var db = client.db("demoDb");
		db.collection("user").deleteOne({ name: "Niharrika"}, function(err, data) {
			if (err) throw err;
			client.close();
			console.log("document deleted")
			res.send(data)
		})
	})
})
app.listen(3000, function () {
	console.log("port is running in 3000")
})
