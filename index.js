let express = require('express');
let app = express();
var ejs = require('ejs');
const session = require('express-session');
let router = require('./router/main')(app);

let port = process.env.PORT || 3000;
let hostname = 'localhost'

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

var server = app.listen(port, function () {
    console.log(`
        Server is running at http://${hostname}:${port}/ 
        Server hostname ${hostname} is listening on port ${port}!
    `);
});
