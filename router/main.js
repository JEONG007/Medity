const crypto = require('crypto');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const { join } = require('path');
// const { test2 } = require('../public/js/argiculture');
// const argi = require('../public/js/argiculture');

// import argiculture from "js/argiculture.js"

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
      res.render('customer', { name: req.session.name });
  });
  app.get('/main2', function (req, res) {
    if (!req.session.name)
      return res.redirect('/login');
    else if(!req.session.cus_addr)
      res.render('doctor', { name: req.session.name, cus_name: "아래에환자Address를입력해주세요" });
    else
      res.render('doctor', { name: req.session.name, cus_name: req.session.cus_addr });
  });
  // app.get('/addrsave', function (req, res) {
  //   if (!req.session.name)
  //     return res.redirect('/login');
  //   else if(!req.session.cus_addr)
  //     res.render('doctor', { name: req.session.name, cus_name: "환자Address입력" });
  //   else
  //     res.render('doctor', { name: req.session.name, cus_name: req.session.cus_addr });
  // });
  app.get('/about', function (req, res) {
    res.render('about.html',{ name: req.session.name });
  });
  app.get('/contact', function (req, res) {
    if(!req.session.cus_addr)
      res.render('contact.html', { cus_name: "Home에서환자Address를저장해주세요" });
    else
      res.render('contact.html', { cus_name: req.session.cus_addr });
  });
  app.get('/Gall_doc', function (req, res) {
    res.render('Gall_doc.html',{ name: req.session.name, cus_name: req.session.cus_addr });
  });
  app.get('/Gall_cus', function (req, res) {
    res.render('Gall_cus.html',{ name: req.session.name });
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
   //       if (err)
   //          return showError("Smart contract call failed: " + err);
   //       showInfo(`Document ${result} <b>successfully added</b> to the registry.`);
   //    }); 
  // });

  // document.write("<script type='text/javascript' src='js/argiculture.js'><"+"/script>");

  app.post('/main', function(req, res) { 
    let id = req.body.addr;
    req.session.name = id;
    console.log("환자 addr : ",id);
    req.session.save(function () {
      return res.redirect('/main');
    }); 
  });

  app.post('/main2', function(req, res) { 
    let id = req.body.addr;
    req.session.name = id;
    console.log("의사 addr : ", id);
    req.session.save(function () {
      return res.redirect('/main2');
    }); 
  });
  app.post('/addrsave', function(req, res) { 
    let cus_addr = req.body.cus_addr;
    req.session.cus_addr = cus_addr;
    console.log("customer address(addrsave) : ", cus_addr);
    // req.session.save();
    req.session.save(function () {
      return res.redirect('/main2');
      
    });
    
    // res.render('contact.html');
  });

  app.post('/login', function (req, res) {
    let id = req.body.username;
    let password = req.body.password;

    let salt = '';
    let pw = '';

      // if (window.ethereum)
      //    try {
      //       await window.ethereum.enable();
      //    } catch (err) {
    //             return showError("Access to your Ethereum account rejected.");
      //    }
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