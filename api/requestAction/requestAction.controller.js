var mongoose = require('./RequestAction.model');
var RequestActionSchema = mongoose.model('RequestAction');

function Controller() {

    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            var RequestAction = new RequestActionSchema(data);
            RequestAction.save().then((newRequestAction) => {
                console.log('RequestAction inserted')
                resolve({
                    status: 200,
                    message: newRequestAction
                })
            }).catch((err) => {
                console.log()
                reject({
                    status: 500,
                    message: err
                })
            })
        })
    };

    this.getAll = (filter) => {
        return new Promise((resolve, reject) => {
            RequestActionSchema.find(JSON.parse(filter)).exec().then((data) => {
                resolve({
                    status: 200,
                    RequestActions: data
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
            RequestActionSchema.findOne({
                RequestActionId: id
            }).exec().then((data) => {
                resolve({
                    status: 200,
                    message: data
                })
            }).catch((err) => {
                reject({
                    status: 404,
                    message: "Error:- RequestAction not found "
                })
            })
        })
    }

    this.update = (data) => {
        return new Promise((resolve, reject) => {
            RequestActionSchema.update(
                { requestActionId: data.requestActionId }, data).then((updatedRequestAction) => {
                    resolve({
                        status: 200,
                        message: updatedRequestAction
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
            RequestActionSchema.deleteOne({ requestActionId: id }).then(() => {
                resolve({
                    status: 200,
                    message: "RequestAction deleted"
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
