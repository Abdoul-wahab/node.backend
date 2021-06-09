
    const mongoose = require('mongoose');

    class MongoClass{
        constructor(){
            this.mongoUrl = process.env.MONGO_URL;
        }

        connectDb(){
            return new Promise( (resolve, reject) => {
                mongoose.connect( this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true  } )
                .then( db => resolve( { db: db, url: this.mongoUrl } ) )
                .catch( dbError => reject( 'MongoDB not connected', dbError ) )
            });
        }
    }
    
    module.exports = MongoClass;