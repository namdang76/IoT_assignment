const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const PythonShell = require('python-shell').PythonShell;

const route = require('./routes');
const db = require('./config/db');

//Connect to DB
db.connect();



const app = express();
const port = 3000;



app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

//HTTP logger
//app.use(morgan('combined'))

//Template engine
app.engine(
    'hbs',
    handlebars.engine({ 
        defaultLayout: 'main', 
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource' , 'view'));

//Routes init
route(app);


/*PythonShell.run('hello.py', null, function (err, results) {
    if (err) throw err;
    console.log('results: %j', results);
    console.log('finished');
  });*/

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
