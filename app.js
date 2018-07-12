const express = require('express')
const app = express();

var port = process.env.PORT || 3000;

app.set("view options", { layout: false });
app.use("/assets", express.static(__dirname + '/assets'));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/pages/dashboard-manager.html');
});


app.get('/user', function (req, res) {
    res.sendFile(__dirname + '/pages/dashboard-user.html');
});
app.get('/user/dashboard', function (req, res) {
    res.sendFile(__dirname + '/pages/dashboard-user.html');
});
app.get('/user/requests', function (req, res) {
    res.sendFile(__dirname + '/pages/requests-user.html');
});

app.get('/manager/dashboard', function (req, res) {
    res.sendFile(__dirname + '/pages/dashboard-manager.html');
});
app.get('/manager/requests', function (req, res) {
    res.sendFile(__dirname + '/pages/requests-manager.html');
});
app.get('/manager', function (req, res) {
    res.sendFile(__dirname + '/pages/dashboard-manager.html');
});


app.listen(port, (err) => {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
    console.log('Listening at port 3000');
})
