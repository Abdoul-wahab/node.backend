

    require('dotenv').config();
    const express = require('express');
    const path = require('path');
    const bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser');
    const passport = require('passport');

    const MongoClass = require('./services/mongo.class')
    const PostModel = require('./models/post.model');



    class ServerClass{
        constructor(){
            this.server = express();
            this.port = process.env.PORT;
            this.mongDb = new MongoClass();
        }

        init(){
            this.server.use( (req, res, next) => {
                const allowedOrigins = ['http://127.0.0.1:8020', 'http://localhost:8020', 'http://127.0.0.1:9000', 'http://localhost:9000'];
                const origin = req.headers.origin;

                if(allowedOrigins.indexOf(origin) > -1){ res.setHeader('Access-Control-Allow-Origin', origin)}
                res.header('Access-Control-Allow-Credentials', true);
                res.header('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST', 'DELETE']);
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

                next();
            });

            this.server.use(bodyParser.json({limit: '20mb'}));
            this.server.use(bodyParser.urlencoded({ extended: true }));

            this.server.use(cookieParser(process.env.COOKIE_SECRET));

            this.config();
        }

        config(){
            const { setAuthentication } = require('./services/passport.service');
            setAuthentication(passport);

            const AuthRouterClass = require('./router/auth.router');
            const authRouter = new AuthRouterClass( { passport } );
            this.server.use('/v1/auth', authRouter.init());

            const ApiRouterClass = require('./router/api.router');
            const apiRouter = new ApiRouterClass({ passport });
            this.server.use('/v1', apiRouter.init());

            const BackRouterClass = require('./router/backoffice.router');
            const backRouter = new BackRouterClass({ passport });
            this.server.use('/', backRouter.init());

            this.launch();
        }

        launch(){
            this.mongDb.connectDb()
            .then( db => {
                this.server.listen( this.port, () => {
                    console.log({
                        node: `http://localhost:${this.port}`,
                        db: db.url,
                    })
                })
            })
            .catch( dbError => {
                console.log(dbError)
            })
        }
    }



    const MyServer = new ServerClass();
    MyServer.init();