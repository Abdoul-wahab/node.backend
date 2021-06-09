
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

    module.exports = {
        createOne,
        readAll
    }