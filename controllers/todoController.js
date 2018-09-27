var bodyparser = require('body-parser');
var mongoose  = require('mongoose');

//This is for connecting to the database
mongoose.connect('mongodb://BMKN:BMKN1!@ds115523.mlab.com:15523/todo',{ useNewUrlParser: true });

//var data = [{item:'Go to Shop'},{item:'Go Cycling'},{item:'Get coffee'}];
var urelencodeParser = bodyparser.urlencoded({extended:false});
//Creating a schema blueprint for data


var todoSchema = new  mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo',todoSchema);




module.exports = function(app){
	app.get('/todo',function(req,res){

		//Get data from MongoDB 
		Todo.find({}, function(err,data){
			if (err) throw err;
				res.render('todo',{todo:data});

		});//Finds all the items if exists

	});
			//Handeling form requests
		app.post('/todo',urelencodeParser,function(req,res){
			//Get data from view and insert to Mongodb
			var newToDo = Todo(req.body).save(function(err,data){
				if (err) throw err;
					res.json(data);

			});

	});

			app.delete('/todo/:item',function(req,res){

				Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
					if (err) throw err;
						res.json(data);
				});
			
			});


		}