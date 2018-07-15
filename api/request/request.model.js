var mongoose = require('../db/dbConfig');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var RequestSchema = new Schema({
    requestId: {
        type: Number,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    managerId: {
        type: String,
        require: true
    },
    departmentId: {
        type: String,
        require: true
    },
    applicationId: {
        type: String,
        require: true
    },
    applicationRole: {
        type: String,
        require: true
    },
    accessType: {
        type: String,
        require: true
    },
    reason: {
        type: String,
        required: true
    },
    requestDate: {
        type: Date,
        default: Date.now
    },
    expireDate: {
        type: Date,
        default: Date.now
    },
    state: {
        type: String,
        default: "CREATED"
    }
});

var UserSchema = new Schema({
    userId: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    managerId: {
        type: String,
        require: true
    }
});

var DepartmentSchema = new Schema({
    departmentId: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    }
});

var ApplicationSchema = new Schema({
    applicationId: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    }
})

var RequestActionSchema = new Schema({
    requestActionId: {
        type:Number,
        required:true
    },
    requestId: { 
        type:Number,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String,
        required: true
    }
})


RequestSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: 'userId',
    justOne: true
});

RequestSchema.virtual('manager', {
    ref: 'User',
    localField: 'managerId',
    foreignField: 'userId',
    justOne: true
});

RequestSchema.virtual('application', {
    ref: 'Application',
    localField: 'applicationId',
    foreignField: 'applicationId',
    justOne: true
});

RequestSchema.virtual('department', {
    ref: 'Department',
    localField: 'departmentId',
    foreignField: 'departmentId',
    justOne: true
});

RequestSchema.virtual('actions', {
    ref: 'RequestAction',
    localField: 'requestId',
    foreignField: 'requestId',
    justOne: false
});

RequestActionSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: 'userId',
    justOne: true
});

RequestSchema.set('toObject', { virtuals: true });
RequestSchema.set('toJSON', { virtuals: true });

mongoose.model('User', UserSchema, 'user');
mongoose.model('Application', ApplicationSchema, 'application');
mongoose.model('Department', DepartmentSchema, 'department');
mongoose.model('Request', RequestSchema);
mongoose.model('RequestAction', RequestActionSchema);

autoIncrement.initialize(mongoose.connection);
RequestSchema.plugin(autoIncrement.plugin, { model: 'Request', field: 'requestId', startAt: 100000 });
RequestActionSchema.plugin(autoIncrement.plugin, { model: 'RequestAction', field: 'requestActionId', startAt: 500000 });
module.exports = mongoose;