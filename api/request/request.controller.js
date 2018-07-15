var mongoose = require('./request.model');
var RequestSchema = mongoose.model('Request');
var RequestActionSchema = mongoose.model('RequestAction');

function Controller() {

    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            var Request = new RequestSchema(data);
            Request.save().then((newRequest) => {
                console.log('Request inserted')
                newRequest.populate('user').populate('manager').populate('application').populate('department').execPopulate().then((data) => {
                    var newRequestAction = new RequestActionSchema({
                        requestId: data.requestId,
                        action: "REQUEST_CREATED",
                        userId: data.userId,
                    });
                    newRequestAction.save().then(() => {
                        resolve({
                            status: 200,
                            message: data
                        })
                    })
                })

            }).catch((err) => {
                reject({
                    status: 500,
                    message: err
                })
            })
        })
    };

    this.getAll = (filter) => {
        return new Promise((resolve, reject) => {
            RequestSchema.find(JSON.parse(filter)).populate('user').populate('manager').populate('application').populate('department').populate('actions').exec().then((data) => {

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
                    message: data
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
                { requestId: data.requestId }, data).then((updatedRequest) => {
                    var newRequestAction = new RequestActionSchema({
                        requestId: data.requestId,
                        action: "REQUEST_UPDATED",
                        userId: "manager",
                    });
                    newRequestAction.save().then(() => {
                        resolve({
                            status: 200,
                            message: updatedRequest
                        })
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
