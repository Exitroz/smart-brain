const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
// import bcrypt from 'bcrypt';
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



/**
 * @type {Knex}
 */
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'exitroz90',
      database : 'smartbrain'
    }
  });

const app = express();
// const saltRounds = 10;

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('success');
});

// Sign in route
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

// Register route
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

// Profile route
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

// image count
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res) })



app.listen(3000, () =>{
    console.log("working")
});



// Planning API
// Route --> response = This is working
// /signin --> POST = success/fail
// /register --> POST = user
// /profile/userid --GET = user
//  /image --> PUT --> user