import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';

// initialize
const app = express();

// enable/disable cross origin resource sharing if necessary
app.use(cors());

// enable/disable http request logging
app.use(morgan('dev'));

// enable only if you want templating
app.set('view engine', 'ejs');

// enable only if you want static assets from folder static
app.use(express.static('static'));

// this just allows us to render ejs from the ../app/views directory
app.set('views', path.join(__dirname, '../src/views'));

// enable json message body for posting data to API
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

// additional init stuff should go before hitting the routing

const lists = [];
const workLists = [];

// default index route
app.get('/', (req, res) => {
  const today = new Date();
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };
  const day = today.toLocaleDateString('en-US', options);
  res.render('list', { title: day, lists });
});

app.post('/', (req, res) => {
  const list = req.body.todo;
  lists.push(list);
  res.redirect('/');
});

app.get('/work', (req, res) => {
  res.render('list', { title: 'Work', lists: workLists });
});

app.post('/work', (req, res) => {
  const item = req.body.todo;
  workLists.push(item);
  res.redirect('/work');
});

app.get('/about', (req, res) => {
  res.render('about');
});

// START THE SERVER
// =============================================================================
const port = process.env.PORT || 9090;
app.listen(port);

console.log(`listening on: ${port}`);
