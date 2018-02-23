var ex = require('express');
var mo = require('method-override'); 
var bp = require('body-parser');

var PORT = process.env.PORT || 3000;

var app = ex();

app.use(ex.static('public'));

app.use(bp.urlencoded({extended: false}));

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/burgers_controller.js');

app.use(routes);

app.listen(PORT, function(){
	console.log('listening');
});