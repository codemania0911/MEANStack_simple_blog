const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type: String
    },
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: "user"
    }
})
    
module.exports = User = mongoose.model('users', UserSchema)