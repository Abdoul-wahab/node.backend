const { Model } = require('mongoose')


    const Controllers = {
        auth: require('./auth.controller'),
        post: require('./post.controller'),
        comment: require('./comment.controller'),
    }

    module.exports = Controllers;