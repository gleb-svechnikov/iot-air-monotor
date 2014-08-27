/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 
 
var UserController = {
    
/*
    index: function(req, res) {
        return res.view({
            user: [{name: 'Hank the Corndog'}, {name: 'Lenny the Corndog'}]
        });
    },
    create: function(req, res) {

    },

    destroy: function(req, res) {

    },

    assignToProject: function(req, res) {

    },
*/
	'add': function(req,res){
		res.locals.flash = _.clone(req.session.flash);
		res.view();
		req.session.flash = {};
	},
	'create': function(req, res, next){
		User.create(
			req.params.all(), 
			
			function userCreated(err,user){
			
				if(err){
					req.session.flash = {
						err: err
					}
					
					console.log(err);
					return res.redirect('/user/add');
				}
				res.json(user);
				req.session.flash = {};
			}
		)
	},
} 

module.exports = UserController;

