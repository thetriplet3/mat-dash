var mongoose = require('../db/dbConfig');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

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


RequestActionSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: 'userId',
    justOne: true
});


mongoose.model('RequestAction', RequestActionSchema);

autoIncrement.initialize(mongoose.connection);
RequestActionSchema.plugin(autoIncrement.plugin, { model: 'RequestAction', field: 'requestActionId', startAt: 500000 });

module.exports = mongoose;