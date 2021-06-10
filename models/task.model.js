
    const mongoose = require('mongoose');
    const { Schema } = mongoose;

    const MySchema = new Schema({
        
        content: String,
        
        isPartOf: {
            type: Schema.Types.ObjectId,
            ref: 'experience'
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

    const MyModel = mongoose.model('task', MySchema);
    module.exports = MyModel;