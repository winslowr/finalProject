const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const expressSession = require('express-session');

app.use(expressSession({
    name: "SessionCookie",
    secret: "express session secret",
    resave: false,
    saveUninitialized: false
}));

const Preferences = require("./Preferences.js");

const login_data = require('data-store')({ path: process.cwd() + '/data/users.json' });

app.post('/login', (req, res) => {

    let user = req.body.user;
    let password = req.body.password;

    let user_data = login_data.get(user);
    if (user_data == null) {
        res.status(404).send("Not found");
        return;
    }
    if (user_data.password == password) {
        console.log("User " + user + " credentials valid");
        req.session.user = user;
        res.json(true);
        return;
    }
    res.status(403).send("Unauthorized");
});

app.get('/logout', (req, res) => {
    delete req.session.user;
    res.json(true);
})

app.get('/preferences', (req, res) => {
    res.json(Secret.getAllIDS);
    return;
});

app.post('/preferences', (req, res) => {
    let s = Secret.create(req.session.user, req.body.secret);
    if (s == null) {
        res.status(400).send("Bad Request");
        return;
    }
    return res.json(s);
});