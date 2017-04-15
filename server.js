const express = require('express');
const fs = require('fs');
const hostname = '188.166.160.252';
const port = 80;
const app = express();
const request=require('request');
var router = express.Router();
app.set('view engine', 'ejs');

app.use(express.static(__dirname));

let http = require('http');

let options = {
  uri: 'http://37.139.19.10/text'
};
var dd_options = {
  'response_code':true,
  'tags': ['app:my_app']
    }


var temp = "there will be text"
router.get('/', (req, res) => {

request('http://37.139.19.10/text', function (error, response, body) {
temp = body;  
//console.log('body:', body); // Print the HTML for the Google homepage. 
});
    res.render('./index.ejs', {data: temp, num: 1});

    
});

var connect_datadog = require('connect-datadog')(dd_options);
app.use(connect_datadog);
app.use(router);

app.listen(port, () => {
    console.log(`
        Server is running at http://${hostname}:${port}/ 
        Server hostname ${hostname} is listening on port ${port}!
    `);
});

