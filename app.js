const express = require('express')
const app = express();

app.set("view options", { layout: false });
app.use("/assets", express.static(__dirname + '/assets'));

app.get('/manager/dashboard', function (req, res) {
    res.sendFile(__dirname + '/pages/dashboard-manager.html');
});
app.get('/manager/requests', function (req, res) {
    res.sendFile(__dirname + '/pages/requests-manager.html');
});
app.get('/manager', function (req, res) {
    res.sendFile(__dirname + '/pages/dashboard-manager.html');
});


app.listen('3000', (err) => {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
    console.log('Listening at port 3000');
})
