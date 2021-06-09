
const { Model } = require('mongoose')



    const Models = {
        post: require('./post.model'),
        user: require('./user.model'),
        comment: require('./comment.model'),
    }


    module.exports = Models;