const user = require("../../models/user")
const aes = require("node-aes")


async function isCreated(username, email){

    const verif1 = await user.findOne({username: username});
    const verif2 = await user.findOne({email: email});

    if(verif1 || verif2) return true
    return false;

}

async function isValidCookie(cookie){

    const dCookie = await aes.decrypt(cookie, process.env.SECRET);
        
    const dCookieBody = JSON.parse(dCookie)

    const verif = await isCreated(dCookieBody.username, "");
    
    if(verif){

        const currentUser = await user.findOne({username: dCookieBody.username});
        const verifPwd = await currentUser.verifyPassword(dCookieBody.password, currentUser.password);

        if(verifPwd){
            return true
        }else{
            return false
        }

    }else{
        return false
    }
}

const createUser = async(req, res)=>{

    const {username, password, email} = req.body;
    
    const verif = await isCreated(username, email);

    if(!verif){

        const newUser = new user({username, password, email});
        newUser.password = await newUser.hashPassword(newUser.password);

        await newUser.save();

        const cookiePayload = await aes.encrypt({
            username: username,
            password: password
        }, process.env.SECRET);


        res.cookie("cookauth_user", cookiePayload)
        res.send("Ok")

    }else{
        res.send("User already exist");
    }
    
}

const isActive = async(req, res)=>{

    try{

        const cookieVerif = await isValidCookie(req.cookie.cookauth_user)

        if(cookieVerif){
            res.send("OK")
        }else{
            res.send("Invalid credentials")
        }
       

    }catch(e){
        console.log(e)
        res.send("Invalid cookie")
    }
    
}

const login = async(req, res)=>{
    const {username, password} = req.body;

    const verif = await isCreated(username, "");
    
    if(verif){
        const currentUser = await user.findOne({username: username});

        const verifPwd = currentUser.verifyPassword(password, currentUser.password);

        if(verifPwd){

            const cookiePayload = await aes.encrypt({
                username: username,
                password: password
            }, process.env.SECRET);
    
            res.cookie("cookauth_user", cookiePayload);
            res.send("OK")

        }else{ 
            res.send("Error");
        }
    }
}



/*
ONLY FOR TESTING
const getUsers = async(req, res)=>{
    res.send(await user.find());
}*/

module.exports = {
    createUser,
   // getUsers,
    isActive,
    login
}