
    let CryptoJS = require("crypto-js");


    const cryptData = (input, type = 'string') => {
        let output = undefined;

        switch(type){
            case 'string':
            output = CryptoJS.AES.encrypt(input, process.env.CRYPTO_KEY);
            break;

            case 'object':
            output = CryptoJS.AES.encrypt(JSON.stringify(input), process.env.CRYPTO_KEY);
            break;
        }


        return output.toString();
    }

    const decryptData = (item, ...inputs) => {
        for( let value of inputs ){
            for( let prop in item ){
                if(value === prop){
                    let crypted  = CryptoJS.AES.decrypt(item[prop].toString(), process.env.CRYPTO_KEY);
                    item[prop] = crypted.toString(CryptoJS.enc.Utf8);
                }
            }
        }

        return item;
    }


    module.exports = {
        cryptData,
        decryptData
    };