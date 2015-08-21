var express = require('express');
var app = express();

// says what port this server will listen to
app.set('port', (process.env.PORT || 5000));

// setting up a file path of where this server will be accessing things
app.use(express.static(__dirname + '/public'));

// set a specific action to an endpoint
app.get('/secret', function(request, response) {
  response.send('Nobody here but us chickens.');
})

// catch-all 404 in case the user requests an endpoint that does not exist
app.use(function(request, response, next) {
  response.status(404).sendFile(__dirname + '/public/404.html');
});

// call the function that makes the server start listening
app.listen(app.get('port'), function() {
  console.log('Node app is running at localhost:' + app.get('port'));
});
