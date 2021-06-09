
    const Models = require('../models/index')


    const createOne = (req) => {
        return new Promise( (resolve, reject) => {
        
            req.body.author = req.user._id;
            req.body.isPartOf = req.params.postId;

        
            Models.comment.create(req.body)
            .then( async commentData => {

                const updatedPost = await Models.post.findByIdAndUpdate(req.params.postId, { $push: { comments: commentData._id } })

                return resolve({ comment: commentData, updated: updatedPost })
            })
            .catch( commentError => reject(commentError) )
        })
    }


    const readAll = () => {
        return new Promise( (resolve, reject) => {
            Models.comment.find( (err, data) => {
                return err
                ? reject(err)
                : resolve(data)
            })
        })
    }


    const readOne = req => {
        return new Promise( (resolve, reject) => {

            Models.comment.findById(req.params.id)
            .populate({ 
                path: 'author'
            })
            .populate({ 
                path: 'comments' ,
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

            Models.comment.findById(req.params.id, (err, mongoPost) => {

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

            Models.comment.deleteOne({ _id: req.params.id, author: req.user._id }, (err, data) => {

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