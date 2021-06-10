const { Model } = require('mongoose')


    const Controllers = {
        auth: require('./auth.controller'),
        post: require('./post.controller'),
        comment: require('./comment.controller'),
        experience: require('./experience.controller'),
        task: require('./task.controller'),
    }

    module.exports = Controllers;