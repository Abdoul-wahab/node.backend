
    const Models = require('../models/index');
    const { cryptData, decryptData } = require('../services/crypto.service');


    const createOne = req => {
        return new Promise( (resolve, reject) => {
            console.log(req.body)
            Models.experience.create(req.body)
            .then( data => resolve(data) )
            .catch( err => reject(err) )
        })
    }


    const readAll = () => {
        return new Promise( (resolve, reject) => {

            Models.experience.find()
            .populate({ 
                path: 'author',
                select: ['firstname', 'lastname', 'email']
            })
            .populate({ path: 'comment' })
            .exec( (err, data) => {

                if( err ){ return reject(err) }
                else{

                    decryptData(data.author, 'firstname', 'lastname')


                    return resolve(data)
                }
            })
        })
    }


    const readOne = req => {
        return new Promise( (resolve, reject) => {

            Models.experience.findById(req.params.id)
            .populate({ 
                path: 'author'
            })
            .populate({ 
                path: 'tasks' ,
                populate: { 
                    path: 'author'
                }
            })
            .exec( (err, data) => {

                if( err ){ return reject(err) }
                else{

                    decryptData(data.author, 'firstname', 'lastname')

                    console.log(data)


                    return resolve(data)
                }
            })
        })
    }


    const updateOne = req => {
        return new Promise( (resolve, reject) => {

            Models.experience.findById(req.params.id, (err, mongoExperience) => {

                if( err ){ return reject(err) }
                else{

                    if( mongoExperience.author === req.user._id ){
                        

                        Models.experience.findByIdAndUpdate(req.params.id, req.body, (err, data) => {

                            
                            return err
                            ? reject(err)
                            : resolve(data)
                        })
                    }
                    else{ return reject('Unauthorized') };
                }
            })
        })
    }


    const deleteOne = req => {
        return new Promise( (resolve, reject) => {

            Models.experience.deleteOne({ _id: req.params.id, author: req.user._id }, (err, data) => {

                return err
                ? reject(err)
                : resolve(data)
            })
        })
    }


    module.exports = {
        createOne,
        readAll,
        readOne,
        updateOne,
        deleteOne
    }
