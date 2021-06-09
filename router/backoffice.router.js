
    const express = require('express');
    const Controllers = require('../controller/index');


    class RouterClass{
        constructor({ passport }){
            this.router = express.Router();
            this.passport = passport;
        }

        routes(){
            
            this.router.get('/', this.passport.authenticate('jwt', { 
                session: false, 
                failureRedirect: '/login' 
            }), (req, res) => {
                Controllers.post.readAll()
                .then( apiResponse => {
                    return res.render('index', { 
                        msg: 'Posts found', 
                        method: req.method,
                        err: null, 
                        data: apiResponse,
                        url: req.originalUrl,
                        status: 200
                    })
                })
                .catch( apiError => {
                    return res.render('index', { 
                        msg: 'Posts found', 
                        method: req.method,
                        err: apiError, 
                        data: null,
                        url: req.originalUrl,
                        status: 404
                    })
                })
            })

            this.router.get('/register', (req, res) => {
                return res.render('register', { 
                    msg: 'Register page', 
                    method: req.method,
                    err: null, 
                    data: null,
                    url: req.originalUrl,
                    status: 200
                })
            })

            this.router.post('/register', (req, res) => {
                Controllers.auth.register(req)
                .then( apiResponse => {
                    console.log(apiResponse)
                    return res.redirect('/')
                })
                .catch( apiError => {
                    return res.render('register', { 
                        msg: 'User not registered', 
                        method: req.method,
                        err: apiError, 
                        data: null,
                        url: req.originalUrl,
                        status: 404
                    })
                })
            })

            this.router.get('/login', (req, res) => {
                return res.render('login', { 
                    msg: 'Login page', 
                    method: req.method,
                    err: null, 
                    data: null,
                    url: req.originalUrl,
                    status: 200
                })
            })

            this.router.post('/login', (req, res) => {
                Controllers.auth.login(req, res)
                .then( apiResponse => {
                    console.log(apiResponse)
                    return res.redirect('/')
                })
                .catch( apiError => {
                    return res.render('login', { 
                        msg: 'User not logged', 
                        method: req.method,
                        err: apiError, 
                        data: null,
                        url: req.originalUrl,
                        status: 404
                    })
                })
            })

            this.router.get('/me', this.passport.authenticate('jwt', { session: false }), (req, res) => {
                return res.json(req.user._id)
            })

            this.router.get('/post/create', (req, res) => {
                return res.render('create', { 
                    msg: 'Display vue create', 
                    method: req.method,
                    err: null, 
                    data: { title:undefined, content: undefined },
                    url: req.originalUrl,
                    status: 200
                })
            })

            this.router.post('/post/create', this.passport.authenticate('jwt', { session: false }), (req, res) => {
                Controllers.post.createOne(req)
                .then( apiResponse => {
                    return res.redirect(`/post/edit/${apiResponse._id}`)
                })
                .catch( apiError => {
                    return res.render('create', { 
                        msg: 'Posts not created', 
                        method: req.method,
                        err: apiError, 
                        data: { title: undefined, content: undefined },
                        url: req.originalUrl,
                        status: 404
                    })
                })
            })

            this.router.get('/post/edit/:id', (req, res) => {
                Controllers.post.readOne(req)
                .then( apiResponse => {
                    return res.render('edit', { 
                        msg: 'Post found', 
                        method: req.method,
                        err: null, 
                        data: apiResponse,
                        url: req.originalUrl,
                        status: 200
                    })
                })
                .catch( apiError => {
                    return res.render('edit', { 
                        msg: 'Post not found', 
                        method: req.method,
                        err: apiError, 
                        data: null,
                        url: req.originalUrl,
                        status: 404
                    })
                })
            })

            this.router.post('/post/edit/:id', this.passport.authenticate('jwt', { session: false }), (req, res) => {
                Controllers.post.updateOne(req)
                .then( apiResponse => {
                    Controllers.post.readOne(req)
                    .then( postData => {
                        return res.render('edit', { 
                            msg: 'Post found', 
                            method: req.method,
                            err: null, 
                            data: postData,
                            url: req.originalUrl,
                            status: 200
                        })
                    })
                    .catch( postError => {
                        return res.render('edit', { 
                            msg: 'Post not found', 
                            method: req.method,
                            err: postError, 
                            data: {title: undefined, content: undefined},
                            url: req.originalUrl,
                            status: 200
                        })
                    })
                    
                })
                .catch( apiError => {
                    return res.render('edit', { 
                        msg: 'Post not updated', 
                        method: req.method,
                        err: apiError, 
                        data: null,
                        url: req.originalUrl,
                        status: 404
                    })
                })
            })

            this.router.get('/post/delete/:id', this.passport.authenticate('jwt', { session: false }), (req, res) => {
                Controllers.post.deleteOne(req)
                .then( apiResponse => {
                    console.log(apiResponse)

                    return res.redirect('/');
                })
                .catch( apiError => {
                    console.log(apiError)

                    return res.redirect('/');
                })
            })
            
            this.router.get('/post/:id', (req, res) => {
                Controllers.post.readOne(req)
                .then( apiResponse => {
                    return res.render('single', { 
                        msg: 'Post found', 
                        method: req.method,
                        err: null, 
                        data: apiResponse,
                        url: req.originalUrl,
                        status: 200
                    })
                })
                .catch( apiError => {
                    return res.render('single', { 
                        msg: 'Post not found', 
                        method: req.method,
                        err: apiError, 
                        data: null,
                        url: req.originalUrl,
                        status: 404
                    })
                })
            })

            this.router.post('/comment/:postId', this.passport.authenticate('jwt', { session: false }), (req, res) => {
                Controllers.comment.createOne(req)
                .then( apiResponse => {
                    console.log(apiResponse)

                    return res.redirect(`/post/${req.params.postId}`)
                })
                .catch( apiError => {
                    console.log(apiError)

                    return res.redirect(`/post/${req.params.postId}`)
                })
            })
        }

        init(){
            this.routes();

            return this.router;
        }
    }


    module.exports = RouterClass;