import Express from 'express';

const app = Express();

app.set('views', './views');
app.set('view engine', 'jade');
app.use('/photos', Express.static('photos'));

app.get('/', function(request, response) {
  let dir = __dirname + '/photos';
  response.render('index', { });
});

export default app;