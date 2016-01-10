// CATEGORY ROUTES
// ==================================================
var express = require('express');
var router = express.Router();

var CategoryModel = require('../models/CategoryModel');

router.route('/categories')
	.post(function(req, res){
		var category = new CategoryModel();
		category.catId = req.body.catId;
		category.name = req.body.name;
		category.save(function(err){
			if (err)
				res.send(err);
			res.json({message: 'Category successfully created!'});
		});
	})
	.get(function(req, res){
		CategoryModel.find(function(err, categories){
			if (err)
				res.send(err);
			res.json(categories);
		});
	});
router.route('/categories/:category_id')
	.get(function(req, res){
		CategoryModel.findById(req.params.category_id, function(err, category){
			if (err)
				res.send(err);
			res.json(category);
		});
	})
	.put(function(req, res){
		CategoryModel.findById(req.params.category_id, function(err, category){
			if (err)
				res.send(err);
			category.name = req.body.name;
			category.save(function(err){
				if (err)
					res.send(err);
				res.json({message: 'Category successfully updated!'});
			});
		});
	})
	.delete(function(req, res){
		CategoryModel.remove({
			_id: req.params.category_id
		}, function(err, category){
			if (err)
				res.send(err);
			res.json({message: 'Category successfully removed!'});
		});
	});

router.use('/api', router);
module.exports = router;