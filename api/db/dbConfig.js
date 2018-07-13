var mongoose =  require('mongoose')

mongoose.connect('mongodb+srv://demo:19940523@demo-cluster-kbhhd.mongodb.net/admin-dash?retryWrites=true',(err) => {
    if (err) {
        console.log('Failed to connect to database');
        process.exit(-1);
    }
    else {
        console.log('Connected to database');
    }
})

module.exports = mongoose;