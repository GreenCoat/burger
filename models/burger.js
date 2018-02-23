var orm = require("../config/orm.js");

var burger = {
	findAll: function(cb){
		orm.findAll("burgers", function(result){
			cb(result);
		});
	},
	createOne: function(col, val, cb){
		orm.createOne("burgers", col, val, function(result){
			cb(result);
		});
	},
	updateOne: function(colVal, condition, cb){
		orm.updateOne("burgers", colVal, condition, cb, function(result){
			cb(result);
		});
	}
};

module.exports = burger;