
    const express = require('express');
    const Controllers = require('../controller/index');


    class RouterClass{
        constructor( { passport } ){
            this.router = express.Router();
            this.passport = passport
        }

        routes(){
            this.router.post('/register', (req, res) => {
                Controllers.auth.register(req)
                .then( apiResponse => res.json( { data: apiResponse, err: null } ))
                .catch( apiError => res.status(401).json( { data: null, err: apiError } ))
            })

            this.router.post('/login', (req, res) => {
                Controllers.auth.login(req, res)
                .then( apiResponse => res.json( { data: apiResponse, err: null } ))
                .catch( apiError => res.status(401).json( { data: null, err: apiError } ))
            })

            this.router.get('/me', this.passport.authenticate('jwt', { session: false }), (req, res) => {
            })
        }

        init(){
            this.routes();

            return this.router;
        }
    }


    module.exports = RouterClass;