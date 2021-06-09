
    const bcrypt = require('bcryptjs');
    const Models = require('../models/index');
    const { cryptData, decryptData } = require('../services/crypto.service');

    const register = req => {
        return new Promise( (resolve, reject) => {
            req.body.firstname = cryptData(req.body.firstname);
            req.body.lastname = cryptData(req.body.lastname);

            bcrypt.hash( req.body.password, 10 )
            .then( hashedPassword => {
                req.body.password = hashedPassword;

                Models.user.create(req.body)
                .then( data => resolve(data) )
                .catch( err => reject(err) )
            })
            .catch( bcryptError => reject(bcryptError))
        })
    }

    const login = (req, res) => {
        return new Promise( (resolve, reject) => {
            Models.user.findOne( { email: req.body.email } )
            .then( data => {
                const passwordValisation = bcrypt.compareSync( req.body.password, data.password );
                if( passwordValisation) {
                    const decryptedUser = decryptData(data, 'firstname', 'lastname');

                    const userToken = data.generateJwt(data);

                    res.cookie(process.env.COOKIE_NAME, userToken, { httpOnly: true });

                    return resolve(decryptedUser)
                }
                else{ return reject('Password not valide') }
            })
            .catch( err => reject(err) )
        })
    }


    module.exports = {
        register,
        login
    }