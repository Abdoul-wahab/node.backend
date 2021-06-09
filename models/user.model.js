
    const jwt = require('jsonwebtoken');
    const mongoose = require('mongoose');
    const { Schema } = mongoose;


    const MySchema = new Schema({
        email: { 
            unique: true, 
            type: String 
        },
        password: String,
        firstname: String,
        lastname: String,
        
        dateCreated: {
            type: Date,
            default: new Date()
        },
        lastConnection: {
            type: Date,
            default: new Date()
        }
    })


    MySchema.methods.generateJwt = user => {
        const expiryToken = new Date();
        expiryToken.setDate( expiryToken.getDate() + 59 );

        const jwtObject = {
            _id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            lastConnection: user.lastConnection,

            expireIn: '5s',
            exp: parseInt( expiryToken.getTime() / 100, 10 )
        }

        return jwt.sign( jwtObject, process.env.JWT_SECRET );
    };


    const MyModel = mongoose.model('user', MySchema);
    module.exports = MyModel;