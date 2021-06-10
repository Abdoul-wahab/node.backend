
const { Model } = require('mongoose')



    const Models = {
        post: require('./post.model'),
        user: require('./user.model'),
        comment: require('./comment.model'),
        experience: require('./experience.model'),
        task: require('./task.model'),
    }


    module.exports = Models;