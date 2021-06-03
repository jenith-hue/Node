var express = require('express');
var app = express();
var cors = require('cors')
var mysql = require("mysql");
var cookieParser = require('cookie-parser');
var app_folder = 'E:/Projects/Angular/Quiz/brainstrom/dist/brainstrom'

app.use(cors());
app.use(cookieParser());

var bodyParser = require('body-parser');
const { json } = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.static(app_folder));


var pool    =    mysql.createPool({
      connectionLimit   :   100,
      host              :   'localhost',
      user              :   'root',
      password          :   '',
      database          :   'quiz',
      debug             :   true
});

function checkAuthentication(req,res){
    if(req.cookies.userDetail){
        req.cookies.userDetail = JSON.parse(req.cookies.userDetail);
        if(!req.cookies.userDetail.id){
            res.status(401).send({status : 'failure',message:'Unauthorized Access'})
            return false
        }
    }else{
        res.status(401).send({status : 'failure',message:'Unauthorized Access'})
        return false
    }
    return true
};

function getlogin(req,res){
	pool.getConnection(function(err,connection)
	{
		if(!err)
		{
			var qurry=`select * from user where username='${req.body.username}' AND password='${req.body.password}'`
			connection.query(qurry,function(err,data)
			{
				connection.release();
				if(err){
					res.send(err);
				}
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
			var qurry=`INSERT INTO user (fname, lname, role, username, phone, password) VALUES ('${req.body.fname}', '${req.body.lname}', '${req.body.role}', '${req.body.username}', '${req.body.phone}', '${req.body.password}')`
			connection.query(qurry,function(err,data)
			{
                connection.release();
                console.log("opo");
				if(err){
                    res.send(err);
                }
				else{
                    console.log("1001");
					res.send({status :'success', message :'registered successful'});
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

function getQuiz(req,res){
    pool.getConnection(function(err,connection)
    {
        if(!err)
		{
            var query = `select * from quiz`
            connection.query(query,function(err,data)
            {
                connection.release();
                if(err){
                    res.send(err);
                }
              res.send({status :'success', message :'quiz got',data:data});
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

function createquiz(req,res){
    pool.getConnection(function(err,connection)
    {
        if(!err)
		{
            var query = `INSERT INTO quiz(name, type) VALUES ('${req.body.name}', '${req.body.type}')`
            connection.query(query,function(err,data)
            {
                connection.release();
                if(err){
                    res.send(err);
                }
                else{
                    res.send({status :'success', message :'quiz created'});
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

function updatequiz(req,res){
    pool.getConnection(function(err,connection)
    {
        if(!err)
		{
            var query = `UPDATE quiz SET name='${req.body.name}',type='${req.body.type}', status='${req.body.status}' WHERE id='${req.body.id}'`
            connection.query(query,function(err,data)
            {
                connection.release();
                if(err){
                    res.send(err);
                }
                else{
                    res.send({status :'success', message :'quiz updated'});
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

function deleteQuiz(req,res){
    pool.getConnection(function(err,connection)
    {
        if(!err)
		{
            var query = `DELETE FROM quiz WHERE id='${req.body.quizid}'`
            connection.query(query,function(err,data)
            {
                connection.release();
                if(err){
                    res.send(err);
                }
               
					res.send({status :'success', message :'quiz deteled'});                

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

function getQuizDetail(req,res){
    pool.getConnection(function(err,connection)
    {
        if(!err)
		{
            var query = `SELECT * FROM quiz WHERE id='${req.body.quiz_id}'`
            connection.query(query,function(err,data)
            {
                connection.release();
                if(err){
                    res.send(err);
                }               
					res.send({status :'success', message :'quiz details got',data:data});               
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

function getQuestionList(req,res){
    pool.getConnection(function(err,connection)
    {
        if(!err)
		{
            var query = `SELECT * FROM questions WHERE quiz_id='${req.body.quiz_id}'`;
            connection.query(query,function(err,data)
            {
                connection.release();
                if(err){
                    res.send(err);
                }
                res.send({status :'success', message :'quiz details got',data:data});
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

function createQuestion(req,res){
    pool.getConnection(function(err,connection)
    {
        if(!err)
		{
            var query = `INSERT INTO questions(quiz_id, question, answer, type, choice) VALUES ('${req.body.quiz_id}', '${req.body.question}', '${req.body.answer}', '${req.body.type}', '${req.body.choice}')`
            connection.query(query,function(err,data)
            {
                connection.release();
                if(err){
                    res.send(err);
                }             
                    res.send({status :'success', message :'question  created'});
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

function updateQuestion(req,res){
    pool.getConnection(function(err,connection)
    {
        if(!err)
		{
            var query = `UPDATE questions SET question='${req.body.question}',answer='${req.body.answer}',type='${req.body.type}',choice='${req.body.choice}' WHERE id='${req.body.id}'`
            connection.query(query,function(err,data)
            {
                connection.release();
                if(err){
                    res.send(err);
                }
                else{
                    res.send({status :'success', message :'quiz updated'});
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

function deleteQuestion(req,res){
    pool.getConnection(function(err,connection)
    {
        if(!err)
		{
            var query = `DELETE FROM questions WHERE id='${req.body.id}'`
            connection.query(query,function(err,data)
            {
                connection.release();
                if(err){
                    res.send(err);
                }
            
					res.send({status :'success', message :'question deteled'});
               

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

function getAvailableQuiz(req,res){
    pool.getConnection(function(err,connection)
    {
        if(!err)
		{
            var query = `SELECT A.id, A.name, A.type , A.status ='published' FROM quiz A && A.id NOT IN (SELECT B.quizid FROM quiz_result B WHERE B.userid='${req.cookies.userDetail.id}')`
            connection.query(query,function(err,data)
            {
                connection.release();
                if(err){
                    res.send(err);
                }
					res.send({status :'success', message :'avail quiz got',data:data});              
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

function getCompletedQuiz(req,res){
    pool.getConnection(function(err,connection)
    {
        if(!err)
		{
            var query = `SELECT A.userid, A.quizid, A.score,A.score_percentage ,B.name,B.type FROM quiz_result A INNER JOIN quiz B ON B.id=A.quizid WHERE A.userid='${req.cookies.userDetail.id}'`
            connection.query(query,function(err,data)
            {
                connection.release();
                if(err){
                    res.send(err);
                }
   
					res.send({status :'success', message :'completed quiz got',data:data});
               

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

function getQuizResult(req,res){
    pool.getConnection(function(err,connection)
    {
        if(!err)
		{
            var query = `select  a.question, a.answer as admin_ans, b.answer as user_ans from questions a INNER JOIN answer b ON b.questionid=a.id where b.userid ='${req.cookies.userDetail.id}' && a.quiz_id='${req.body.quizid}'`
            connection.query(query,function(err,data)
            {
                connection.release();
                if(err){
                    res.send(err);
                }
					res.send({status :'success', message :'completed quiz got',data:data});
              
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

function checkAllowableQuiz(req,res){
    pool.getConnection(function(err,connection)
    {
        if(!err)
		{
            var query = `SELECT A.name, A.type, A.id FROM quiz A WHERE A.status='published' AND A.id='${req.body.quiz_id}' AND A.id NOT IN (SELECT B.quizid FROM quiz_result B WHERE B.userid ='${req.cookies.userDetail.id}')`
            connection.query(query,function(err,data)
            {
                connection.release();
                if(err){
                    res.send(err);
                }
    
					res.send({status :'success', message :'allowable quiz got',data:data});
               

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

function getQuestionsByquizId(req,res){
    pool.getConnection(function(err,connection)
    {
        if(!err)
		{
            var query = `SELECT A.quiz_id, A.question, A.type, A.choice FROM questions A WHERE A.quiz_id='${req.body.quiz_id}'`
            connection.query(query,function(err,data)
            {
                connection.release();
                if(err){
                    res.send(err);
                }
                if(data.length)
                {
					res.send({status :'success', message :'question got',data:data});
                }
                else{
                    res.send({status :'failure', message :'question not got'});
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

function getAnswerByQuestion(req,res){
    pool.getConnection(function(err,connection)
    {
        if(!err)
		{
            var query = `SELECT A.answer, A.quizid, A.userid  FROM answer A WHERE questionid='${req.body.questionid}'`
            connection.query(query,function(err,data)
            {
                connection.release();
                if(err){
                    res.send(err);
                }
                if(data.length)
                {
					res.send({status :'success', message :'got answer by question',data:data});
                }
                else{
                    res.send({status :'failure', message :'not got answer by question'});
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

function updateAnswer(req,res){
    pool.getConnection(function(err,connection)
    {
        if(!err)
		{
            var query = `UPDATE answer SET userid='${req.cookies.userDetail.id}',questionid='${req.body.questionid}',quizid='${req.body.quizid}',answer='${req.body.answer}' WHERE questionid='${req.body.questionid}'`
            connection.query(query,function(err,data)
            {
                connection.release();
                if(err){
                    res.send(err);
                }
					res.send({status :'success', message :'answer updated',data:data});
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

function insertAnswer(req,res){
    pool.getConnection(function(err,connection)
    {
        if(!err)
		{
            var query = `INSERT INTO answer(userid, questionid, quizid, answer) VALUES ('${req.cookies.userDetail.id}','${req.body.questionid}','${req.body.quizid}','${req.body.answer}')`
            connection.query(query,function(err,data)
            {
                connection.release();
                if(err){
                    res.send(err);
                }
					res.send({status :'success', message :'answer inserted',data:data});
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

function saveAnswer(req,res){
    pool.getConnection(function(err,connection)
    {
        if(!err)
		{
            var query = `SELECT * FROM answer  WHERE userid='${req.cookies.userDetail.id}' && questionid='${req.body.questionid}'`
            connection.query(query,function(err,data)
            {
                connection.release();
                if(err){
                    res.send(err);
                }
                if(data.length)
                {
                    updateAnswer(req,res);
                }
                else{
                    insertAnswer(req,res);
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

function pushintoResult(req,res,score,score_percentage){
    pool.getConnection(function(err,connection)
    {
        if(!err)
		{
            var query = `INSERT INTO quiz_result (userid, quizid, score,score_percentage) VALUES ('${req.cookies.userDetail.id}','${req.body.quizid}','${score}','${score_percentage}')`
            connection.query(query,function(err,data)
            {
                connection.release();
                if(err){
                    res.send(err);
                }
                    res.send({status :'success', message :'submitted  successfully'});
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



function submitQuiz(req,res){
    pool.getConnection(function(err,connection)
    {
        if(!err)
		{
            var query = `SELECT A.answer as u_answer ,B.answer as a_answer FROM answer A INNER JOIN questions B on A.questionid=B.id WHERE A.quizid='${req.body.quizid}' && A.userid='${req.cookies.userDetail.id}'`
            connection.query(query,function(err,data)
            {
                connection.release();
                if(err){
                    res.send(err);
                }
                if(data.length)
                {
                    var score=0;
                    for(var i=0;i<data.length;i++)
                    {
                        if(data[i].u_answer.toLowerCase()==data[i].a_answer.toLowerCase())
                        {
                            score=score+1;
                        }
                        
                    }
                    var score_percentage = (score/data.length)*100;  
                    pushintoResult(req,res,score,score_percentage);            
                }
                else{
                    res.send({status :'failure', message :'not submitted'});
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

app.post('/login',function(req,res){
	if(req.body.username && req.body.password)
	{
		getlogin(req,res);
		
	}
	else{
		res.send({status:'failure', message:'invalid user name and password'});

	}
});

app.post('/register',function(req,res){
	if(req.body.fname && req.body.lname && req.body.role && req.body.username && req.body.phone && req.body.password)
	{
		getregister(req,res);
		
	}
	else{
		res.send({status:'failure', message:'enter all fields'});

	}
});

app.get('/getQuiz',function(req,res){
    if(checkAuthentication(req,res))
    {
        getQuiz(req,res);
    }
});

app.post('/createQuiz',function(req,res){
    if(checkAuthentication(req,res)){

    if(req.body.name && req.body.type)
	{
        createquiz(req,res);
    }
    else{
		res.send({status:'failure', message:'enter all fields'});

    }
}
});

app.post('/updateQuiz',function(req,res){
    if(checkAuthentication(req,res)){

    if(req.body.name || req.body.type || req.body.id || req.body.status)
	{
    updatequiz(req,res);
    }
    else{
		res.send({status:'failure', message:'enter all fields'});

    }
}
});


app.post('/deleteQuiz',function(req,res){
    if(checkAuthentication(req,res)){

	if(req.body.quizid)
	{
	deleteQuiz(req,res);
}
else{
    res.send({status:'failure', message:'enter the id'});
}
    }
});

app.post('/getQuizDetail',function(req,res){
    if(checkAuthentication(req,res)){

	if(req.body.quiz_id)
	{
		getQuizDetail(req,res);
    }
    else{
        res.send({status:'failure', message:'enter the id'});

    }
}
});

app.post('/getQuestionList',function(req,res){
    if(checkAuthentication(req,res)){

	if(req.body.quiz_id)
	{
		getQuestionList(req,res);
    }
    else{
        res.send({status:'failure', message:'enter the id'});
    }
}
});

app.post('/createQuestion',function(req,res){
    if(checkAuthentication(req,res)){

    if(req.body.question && req.body.answer && req.body.type || req.body.choice && req.body.quiz_id)
	{
		createQuestion(req,res);
    }
    else{
		res.send({status:'failure', message:'enter all fields'});

    }
}
});

app.post('/updateQuestion',function(req,res){
    if(checkAuthentication(req,res)){

    if( req.body.question || req.body.answer || req.body.type || req.body.choice || req.body.id)
	{
		updateQuestion(req,res);
    }
    else{
		res.send({status:'failure', message:'enter all fields'});

    }
}
});

app.post('/deleteQuestion',function(req,res){
    if(checkAuthentication(req,res)){

	if(req.body.id)
	{
		deleteQuestion(req,res);
}
    }
});

app.post('/getAvailableQuiz',function(req,res){
    if(checkAuthentication(req,res)){

        getAvailableQuiz(req,res);
    }
});

app.post('/getCompletedQuiz',function(req,res){
    if(checkAuthentication(req,res)){

	if(req.body.quiz_id)
	{
		getCompletedQuiz(req,res);
}
else
{
    res.send({status:'failure', message:'enter quiz id'});
}
    }
});

app.post('/getQuizResult',function(req,res){
    if(checkAuthentication(req,res)){

	if(req.body.quizid)
	{
		getQuizResult(req,res);
}
    }
});

app.post('/checkAllowableQuiz',function(req,res){
    if(checkAuthentication(req,res)){

	if(req.body.quiz_id)
	{
		checkAllowableQuiz(req,res);
}
    }
});

app.post('/getQuestionsByquizId',function(req,res){
    if(checkAuthentication(req,res)){

	if(req.body.quiz_id)
	{
		getQuestionsByquizId(req,res);
}
    }
});

app.post('/getAnswerByQuestion',function(req,res){
    if(checkAuthentication(req,res)){

	if(req.body.questionid)
	{
		getAnswerByQuestion(req,res);
}
    }
});


app.post('/saveAnswer',function(req,res){
    if(checkAuthentication(req,res)){
        if(req.body.answer && req.body.questionid  && req.body.quizid)
        {
            saveAnswer(req,res);
        }
    }
});

app.post('/submitQuiz',function(req,res){
    if(checkAuthentication(req,res)){
	   if(req.body.quizid)
	   {
		  submitQuiz(req,res);
       }
    }
else{
    res.send({status:'failure', message:'enter all fields'});
}
});

app.all('*',function(req,res){
	res.status(200).sendFile('/',{root:app_folder});
});

console.log('server is running on port : 3000')
app.listen(3000);

