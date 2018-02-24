var ex = require('express');

var router = ex.Router();

var burger = require('../models/burger.js');

router.get("/", function(res, res){
	burger.findAll(function(data){
		var hbsObject = {
			burgers: data
		};
		res.render("index", hbsObject);
	});
});

router.post("/api/burgers", function(req, res){
	burger.createOne([
		"burger_name", "devoured"
		], [
		req.body.burger, false
		], function(result){
			res.json({id: result.Id});
		});
});

router.put("/api/burgers/:id", function(req, res){
	var condition = "id = " + req.params.id;

	burger.updateOne({
		devoured: true
	}, condition, function(result){
		if(result.changedRows == 0){
			return res.status(404).end();
		} else {
			return res.status(200).end();
		}
	});
});

module.exports = router;