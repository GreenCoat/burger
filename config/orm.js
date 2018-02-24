var connection = require("./connection.js");

var orm = {
	findAll: function(table, cb){
		var query = "SELECT * FROM " + table + ";";
		connection.query(query, function(err, result){
			if(err){throw err}
			cb(result);
		}) 
	},
	createOne: function(table, col, val, cb){
		var query = "INSERT INTO " + table;
		query += " (";
		query += col.toString();
		query += ") ";
		query += "VALUES (";
		query += printQs(val.length);
		query += ")";

		connection.query(query, val, function(err, result){
			if(err){throw err}
			cb(result);
		});
	},
	updateOne: function(table, colVal, condition, cb){
		var query = "UPDATE " + table;
		query += " SET ";
		query += objToSql(colVal);
		query += " WHERE ";
		query += condition;

		connection.query(query, colVal, function(err, result){
			if(err){throw err}
			cb(result);
		});
	}
}

function printQs(val){
	var arr = [];

	for(var i = 0; i < val; i++){
		arr.push("?");
	}

	return arr.toString();
}

function objToSql(ob){
	var arr = [];

	for(var key in ob){
		var value = ob[key];

		if(Object.hasOwnProperty.call(ob, key)){
			if(typeof value === "string" && value.indexOf(" ") >= 0){
				value = "'" + value + "'";
			}

			arr.push(key + " = " + value);
		}
	}

	return arr.toString();
}

module.exports = orm;

