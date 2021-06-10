
    const mongoose = require('mongoose');
    const { Schema } = mongoose;

    const MySchema = new Schema({
        content: String,

        name: String,
        description: String,
        role: String,
        type: String,
        startDate : {
            type: Date,
            default: new Date()
        },
        endDate: {
            type: Date,
            default: new Date()
        },
        
        author: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        dateCreated: {
            type: Date,
            default: new Date()
        }
    })

    const MyModel = mongoose.model('experience', MySchema);
    module.exports = MyModel;