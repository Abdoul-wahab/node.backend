
    const Models = require('../models/index')


    const createOne = (req) => {
        return new Promise( (resolve, reject) => {
        
            req.body.author = req.user._id;
            req.body.isPartOf = req.params.postId;

        
            Models.task.create(req.body)
            .then( async taskData => {

                const updatedPost = await Models.post.findByIdAndUpdate(req.params.postId, { $push: { tasks: taskData._id } })

                return resolve({ task: taskData, updated: updatedPost })
            })
            .catch( taskError => reject(taskError) )
        })
    }


    const readAll = () => {
        return new Promise( (resolve, reject) => {
            Models.task.find( (err, data) => {
                return err
                ? reject(err)
                : resolve(data)
            })
        })
    }


    const readOne = req => {
        return new Promise( (resolve, reject) => {

            Models.task.findById(req.params.id)
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

            Models.task.findById(req.params.id, (err, mongoPost) => {

                if( err ){ return reject(err) }
                else{

                    if( mongoPost.author === req.user._id ){
                        

                        Models.post.findByIdAndUpdate(req.params.id, req.body, (err, data) => {

                            
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

            Models.task.deleteOne({ _id: req.params.id, author: req.user._id }, (err, data) => {

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