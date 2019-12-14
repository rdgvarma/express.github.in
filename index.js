const express = require('express');
const path = require('path');


const logging = require('./moddleware/logging')
const app = express();
// app.get('/', (req,res) =>  {
//    res.send(`programming in express.js`);
// });

// INIT middleware
//app.use(logging);

//bodyparser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//set static folder
app.use(express.static(path.join(__dirname,'public')));

//heroes api routes
app.use('/api/heroes', require ('./routes/api/heroes'))

const port = process.env.port||5000;
app.listen(port,() => {console.log(`server running on port ${port}`)})
