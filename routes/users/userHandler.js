const user = require("../../models/user")
const aes = require("node-aes");
const { isCreated, isValidCookie } = require("../../utils/user");

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

        const verifPwd = verif.verifyPassword(password, verif.password);

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

const getEmail = async(req, res)=>{
    try{

        const cookieVerif = await isValidCookie(req.cookie.cookauth_user)

        if(cookieVerif){
            res.send(cookieVerif.email);
        }else{
            res.send("Invalid credentials")
        }
       

    }catch(e){
        console.log(e)
        res.send("Invalid cookie")
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
    login,
    getEmail
}