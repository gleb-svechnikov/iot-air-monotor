/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	schema: true,
	attributes: {
		name: {
			type: 'string',
			required: true
		},
		projects: {
			type: 'string'
		},
		email: {
			type: 'string',
			email: true,
			required: true,
			unique: true
		},
		password: {
			type: 'string'
		},
		clearFields: function(){
			var obj = this.toObject();
			delete obj.password;
			delete obj._csrf;
			return obj;
		} 
	
	}
};

