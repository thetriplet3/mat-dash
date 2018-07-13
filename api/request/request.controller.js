var mongoose = require('./Request.model');
var RequestSchema = mongoose.model('Request');


function Controller() {

    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            var Request = new RequestSchema(data);
            Request.save().then(() => {
                console.log('Request inserted')
                resolve({
                    status: 200,
                    message: "Request inserted"
                })
            }).catch((err) => {
                reject({
                    status: 500,
                    message: err
                })
            })
        })
    };

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            RequestSchema.find().populate('user').populate('manager').populate('application').populate('department').exec().then((data) => {
                console.log(data);
                resolve({
                    status: 200,
                    Requests: data
                })
            }).catch((err) => {
                console.log(err);
                reject({
                    status: 500,
                    message: "Error " + err
                })
            })

        })
    };

    this.get = (id) => {
        return new Promise((resolve, reject) => {
            RequestSchema.findOne({
                requestId: id
            }).populate('user').populate('manager').populate('application').populate('department').exec().then((data) => {
                resolve({
                    status: 200,
                    Request: data
                })
            }).catch((err) => {
                reject({
                    status: 404,
                    message: "Error:- Request not found "
                })
            })
        })
    }

    this.update = (data) => {
        return new Promise((resolve, reject) => {
            RequestSchema.update(
                { requestId: data.requestId }, data).then(() => {
                    resolve({
                        status: 200,
                        message: "Request Updated Successfully"
                    })
                }).catch((err) => {
                    reject({
                        status: 500,
                        message: "Error:- " + err
                    })
                })
        })
    }

    this.delete = (id) => {
        return new Promise((resolve, reject) => {
            RequestSchema.deleteOne({ requestId: id }).then(() => {
                resolve({
                    status: 200,
                    message: "Request deleted"
                })
            }).catch((err) => {
                reject({
                    status: 500,
                    message: err
                })
            })
        })
    }

}

module.exports = new Controller();
