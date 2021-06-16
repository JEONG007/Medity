const crypto = require('crypto');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

// const { web3 } = window
// const selectedAddress = web3.eth.defaultAccount


// var mysql = require('mysql');
// var dbConfig = require('./dbconfig');
// var conn = mysql.createConnection(dbOptions);
// conn.connect();



module.exports = function (app) {
  app.use(session({
    secret: '!@#$%^&*',
    // store: new MySQLStore(dbOptions),
    resave: false,
    saveUninitialized: false
  }));

  app.use(bodyParser.json());       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));

  app.get('/', function (req, res) {
    if (!req.session.name)
      res.redirect('/login');
    else
      res.redirect('/main');
  });

  app.get('/login', function (req, res) {
    if (!req.session.name)
      res.render('login', { message: 'input your id and password.' });
    else
      res.redirect('/main');
  });

  app.get('/main', function (req, res) {
    if (!req.session.name)
      return res.redirect('/login');
    else
      res.render('doctor', { name: req.session.name });
  });
  app.get('/main2', function (req, res) {
    if (!req.session.name)
      return res.redirect('/login');
    else
      res.render('customer', { name: req.session.name });
  });
  app.get('/about', function (req, res) {
    res.render('about.html');
  });
  app.get('/contact', function (req, res) {
    res.render('contact.html');
  });
  app.get('/Gall_doc', function (req, res) {
    res.render('Gall_doc.html');
  });
  app.get('/Gall_cus', function (req, res) {
    res.render('Gall_cus.html');
  });
  app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
      res.redirect('/');
    });
  });
  // app.post('/upload', function (req, res) {
  //   let proloc = req.body.proloc;
  //   let prohospital = req.body.prohospital;

  //   contract.addProStru(howMany, productName, whereIs, function(err, result) {
	// 		if (err)
	// 			return showError("Smart contract call failed: " + err);
	// 		showInfo(`Document ${result} <b>successfully added</b> to the registry.`);
	// 	}); 
  // });


  app.post('/login', function (req, res) {
    let id = req.body.username;
    let password = req.body.password;

    let salt = '';
    let pw = '';

		// if (window.ethereum)
		// 	try {
		// 		await window.ethereum.enable();
		// 	} catch (err) {
    //             return showError("Access to your Ethereum account rejected.");
		// 	}
		// if (typeof web3 === 'undefined')
    //             return showError("Please install MetaMask to access the Ethereum Web3 injected API from your Web browser.");
			
		// let account = selectedAddress 
		// console.log("my account " , account);

    crypto.randomBytes(64, (err, buf) => {
      if (err) throw err;
      salt = buf.toString('hex');
    });


    crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) throw err;
      pw = derivedKey.toString('hex');
    });

    // var user = results[0];
    crypto.pbkdf2(password, salt, 100000, 64, 'sha512', function (err, derivedKey) {
      if (err)
        console.log(err);
      if (derivedKey.toString('hex') === pw) {
        req.session.name = id;
        req.session.save(function () {
          return res.redirect('/main');
        });
      }
      else {
        return res.render('login', { message: 'please check your password.' });
      }
    });//pbkdf2
  }); // end of app.post
}