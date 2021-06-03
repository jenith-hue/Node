var express = require('express');
var app = express();
var cors = require('cors')
var mysql = require("mysql");
var app_folder = '../portal/'
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.static(app_folder));

var pool    =    mysql.createPool({
      connectionLimit   :   100,
      host              :   'localhost',
      user              :   'root',
      password          :   '',
      database          :   'employee_registry',
      debug             :   true
});

app.get('/', function(req, res){
   res.send("Hello world!");
});

function getlogin(req,res){
	pool.getConnection(function(err,connection)
	{
		if(!err)
		{
			var qurry=`select * from employee where email='${req.body.username}' AND password='${req.body.password}'`
			connection.query(qurry,function(err,data)
			{
				connection.release();
				if(err){
					res.send(err);
				}
				console.log("1111");
				if(data.length)
				{
					res.send({status :'success',message :'logged in success',data : data[0]});
				}
				else{
					res.send({status:'failure',message:'invalid user name and password'});
				}
			})
			connection.on('error',function(errObj){
				res.send(errObj);
			})
			
		}
		else{
			res.send(err);
		}
		
	})
}


function getregister(req,res){
	pool.getConnection(function(err,connection)
	{
		if(!err)
		{
			var qurry=`INSERT INTO employee (id, firstname, lastname, role, email, phone, password, reg_date) VALUES ('', '${req.body.fname}', '${req.body.lname}', '${req.body.role}', '${req.body.email}', '${req.body.phone}', '${req.body.password}', CURRENT_TIMESTAMP)`
			connection.query(qurry,function(err,data)
			{
				connection.release();
				if(err){
					res.send(err);

				}
				else{
					res.send({status :'success', message :'logged in success'});
				}
				console.log("1111");
			})
			connection.on('error',function(errObj){
				res.send(errObj);
			})
			
		}
		else{
			res.send(err);
		}
		
	})
}


function getregisterinfo(req,res){
	pool.getConnection(function(err,connection)
	{
		if(!err)
		{
			var qurry=`select * from employee`
			connection.query(qurry,function(err,data)
			{
				connection.release();
				if(err){
					res.send(err);
				}
				console.log("1111");
				if(data.length)
				{
					res.send({status :'success',message :'logged in success',data : data});
				}
				else{
					res.send({status:'failure',message:'invalid user name and password'});
				}
			})
			connection.on('error',function(errObj){
				res.send(errObj);
			})
			
		}
		else{
			res.send(err);
		}
		
	})
}



app.post('/loginUser',function(req,res){
	if(req.body.username && req.body.password)
	{
		getlogin(req,res);
		
	}
	else{
		res.send({status:'failure', message:'invalid user name and password'});

	}
});

app.post('/registerUser',function(req,res){
	if(req.body.fname && req.body.lname && req.body.role && req.body.email && req.body.phone && req.body.password)
	{
		getregister(req,res);
		
	}
	else{
		res.send({status:'failure', message:'invalid user name and password'});

	}
});

app.get('/registerInfo',function(req,res){
		getregisterinfo(req,res);
});

app.all('*',function(req,res){
	res.status(200).sendFile('/',{root:app_folder});
});




console.log('server is running on port : 3000')
app.listen(3000);