const user = require("../../models/user")
const aes = require("node-aes")


async function isCreated(username, email){

    const verif1 = await user.findOne({username: username});
    const verif2 = await user.findOne({email: email});

    if(verif1 || verif2){
        if(verif1){
            return verif1
        }else{
            return verif2
        }
    }
    return null;

}

async function isValidCookie(cookie){

    const dCookie = await aes.decrypt(cookie, process.env.SECRET);
        
    const dCookieBody = JSON.parse(dCookie)

    const verif = await isCreated(dCookieBody.username, "");
    
    if(verif){

        const verifPwd = await verif.verifyPassword(dCookieBody.password, verif.password);

        if(verifPwd){
            return true
        }else{
            return false
        }

    }else{
        return false
    }
}

module.exports = {
    isCreated,
    isValidCookie
}