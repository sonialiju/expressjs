/**
 * Route file for managing persons
 *
 */
var express = require('express');
var router = express.Router();

//For validating form
var expressvalidator = require('express-validator');
// For using mongodb
var mongojs = require('mongojs');
var db = mongojs('customerapp', ['people']);
var ObjectId = mongojs.ObjectID;

/**
 * Express validator Middleware for validating forms
 */
router.use(expressvalidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split("."),
            root = namespace.shift(),
            formparam = root;
        while (namespace.length) {
            formparam += '[' + namespace.shift() + ']';
        }
        return {
            param: formparam,
            msg: msg,
            value: value
        };

    }
}));
/**
 * First function call when the app runs, Getting all the persons from db
 * @return people
 */
router.get("/", function (req, res) {
    db.people.find(function (err, docs) {
        res.render('index', {
            title: 'Persons',
            people: docs
        });
    });
});

/**
 * Function call for create new Person
 *
 */
router.post("/", function (req, res) {

    //Performing validation checks with express validator
    req.checkBody("name", 'Name is required').notEmpty();
    req.checkBody("email", 'Email is required').notEmpty();
    req.checkBody("age", 'Age is required').notEmpty();
    var errors = req.validationErrors();

    //If errors redirect to form with errors
    if (errors) {
        db.people.find(function (err, docs) {
            res.render('index', {
                title: 'Persons',
                people: docs,
                errors: errors
            });
        });
    } else { //Insert the details to db
        var newuser = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
        db.people.insert(newuser, function (err, result) {
            if (err) {
                console.log(err);
            }
            res.redirect('/persons');
        })
    }
});

/**
 * Deletes the person
 * @param id
 */
router.delete("/:id", function (req, res) {
    console.log(req.params.id);
    db.people.remove({_id: ObjectId(req.params.id)}, function (err, result) {
        if (err) {
            console.log(err);
        }
        res.redirect('/persons');
    })

});

/**
 * View the person
 * @param id
 * @return person
 */
router.get("/:id", function (req, res) {
    console.log(req.params.id);
    db.people.find({_id: ObjectId(req.params.id)},function(err,result){
        // console.log(result[0].name);

        if (err) {
            console.log(err);
        }else{
            var singleuser = {
                name: result[0].name,
                email: result[0].email,
                age: result[0].age
            }
            res.render('viewperson', {
                title: 'Persons',
                singleuser: singleuser,
            });
        }

    })

});

/**
 * Edit the person
 * @param id
 * @return person
 */
router.get("/edit/:id", function (req, res) {
    console.log(req.params.id);
    db.people.find({_id: ObjectId(req.params.id)},function(err,result){
        // console.log(result[0].name);

        if (err) {
            console.log(err);
        }else{
            var singleuser = {
                id: result[0]._id,
                name: result[0].name,
                email: result[0].email,
                age: result[0].age
            }
            res.render('editperson', {
                title: 'Persons',
                singleuser: singleuser,
            });
        }

    })

});

/**
 * Updates person's details
 */

router.post("/update", function (req, res) {

    //Performing validation checks with express validator
    req.checkBody("name", 'Name is required').notEmpty();
    req.checkBody("email", 'Email is required').notEmpty();
    req.checkBody("age", 'Age is required').notEmpty();
    var errors = req.validationErrors();

    //If errors redirect to form with errors
    if (errors) {
        //Returns back the submitted form with errors
            var singleuser = {
                id: req.body.userid,
                name: req.body.name,
                email:req.body.email,
                age: req.body.age,
            }
            res.render('editperson', {
                title: 'Persons',
                singleuser: singleuser,
                errors: errors
            });

    } else { //Insert the details to db
        db.people.update({_id:ObjectId(req.body.userid)},{$set:{name:req.body.name,email:req.body.email,age:req.body.age}}, function (err, result) {
            if (err) {
                console.log(err);
            }
            res.redirect('/persons');
        })
    }
});


module.exports = router;