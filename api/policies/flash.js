module.exports = function(request, response, next){
	response.locals.flash();
	if(!request.session.flash) {return next();}
	response.locals.flash = _.clone(request.session.flash())
	request.session.flash = {};
	next();
}