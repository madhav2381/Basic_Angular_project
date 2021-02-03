const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const api = require('./server/routes/api');
const port = 3000;



const app = express();

app.use(express.static(path.join(__dirname,'dist')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200' }));

app.use('/api',api);

app.get('*',(req, res) =>{
    res.sendFile(path.join(__dirname, 'dist/angapp/index.html'));
});

app.listen(port, () => console.log('Example app listening on port --'+port));

