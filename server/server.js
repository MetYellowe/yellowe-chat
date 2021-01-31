const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
db.mongoose
    .connect("mongodb+srv://Met:Yellowe@cluster0-lasjq.gcp.mongodb.net/nuxt_chat?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connected to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if(!err && count == 0) {
            new Role({
                name: "user"
            }).save(err => {
                if(err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection")
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if(err) {
                    console.log("error", err);
                }
                console.log("added 'moderator' to roles collection")
            });

            new Role({
                name: "admin"
            }).save(err => {
                if(err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection")
            });
        }
    });
}

app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, './app/public')));

require('./app/routes/auth-routes')(app);
require('./app/routes/user-routes')(app);

const PORT = process.env.PORT || 8080;
const http = require('http').Server(app);

http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})

module.exports = {
    path: '/server/',
    handler: http
}