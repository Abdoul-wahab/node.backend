
    const mongoose = require('mongoose'); 
    const { Schema } = mongoose;


    const MySchema = new Schema({
        title: { type: String },
        content: String,
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'comment'
        }], 

        author: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        dateCreated: {
            type: Date,
            default: new Date()
        },
        dateUpdated: {
            type: Date,
            default: null
        }
    })


    const MyModel = mongoose.model('post', MySchema);
    module.exports = MyModel;