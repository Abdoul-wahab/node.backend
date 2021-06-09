
    const express = require('express');
    const Controllers = require('../controller/index');


    class RouterClass{
        constructor({ passport }){
            this.router = express.Router();
            this.passport = passport;
        }

        routes(){
            
            this.router.get('/', (req, res) => {
                return res.json( { msg: "Hello API" } )
            })

            this.router.post('/:endpoint', this.passport.authenticate('jwt', { session: false }), (req, res) => {
                req.body.author = req.user._id;

                Controllers[req.params.endpoint].createOne(req)
                .then( apiResponse => res.json( { data: apiResponse, err: null } ))
                .catch( apiError => res.json( { data: null, err: apiError } ))
            })

            this.router.get('/:endpoint', (req, res) => {
                Controllers[req.params.endpoint].readAll()
                .then( apiResponse => res.json( { data: apiResponse, err: null } ))
                .catch( apiError => res.json( { data: null, err: apiError } ))
            })

            this.router.get('/:endpoint/:id', (req, res) => {
                Controllers[req.params.endpoint].readOne(req)
                .then( apiResponse => res.json( { data: apiResponse, err: null } ))
                .catch( apiError => res.json( { data: null, err: apiError } ))
            })

            this.router.put('/:endpoint/:id', this.passport.authenticate('jwt', { session: false }), (req, res) => {
                console.log(req.user)
                Controllers[req.params.endpoint].updateOne(req)
                .then( apiResponse => res.json( { data: apiResponse, err: null } ))
                .catch( apiError => res.json( { data: null, err: apiError } ))
            })

            this.router.delete('/:endpoint/:id', this.passport.authenticate('jwt', { session: false }), (req, res) => {
                Controllers[req.params.endpoint].deleteOne(req)
                .then( apiResponse => res.json( { data: apiResponse, err: null } ))
                .catch( apiError => res.json( { data: null, err: apiError } ))
            })
        }

        init(){
            this.routes();

            return this.router;
        }
    }

    module.exports = RouterClass;