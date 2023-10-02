const bcryptjs = require("bcryptjs")
const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const userSchema = new Schema({

    username: {required: true, type: String},
    password: {required: true, type: String},
    email: {required: true, type: String},

})

userSchema.methods.hashPassword = async(pwd)=>{
    const salt = await bcryptjs.genSalt();
    const hash = await bcryptjs.hash(pwd, salt)

    return hash;
}

userSchema.methods.verifyPassword = async(pwd, hash)=>{
    
    return await bcryptjs.compare(pwd, hash);

}

module.exports = mongoose.model("user", userSchema);