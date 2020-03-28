const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
var myData=[]
app.get('/',function(req,res){
	res.status(200).json(myData)
})
app.post('/users',function(req,res){
	console.log(req.body)
	myData.push(req.body);
	res.json({
		message:"Request Recieved"
	})
})
app.listen(3000,function () {
	console.log("Port is running in 3000")
});
