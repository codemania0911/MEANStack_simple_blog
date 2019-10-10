const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title:{
        type: String
    },
    author:{
        type: String
    },
    postdate:{
        type: Date
    },
    image:{
        type: String
    },
    content:{
        type: String
    },
    updated_on:{
        type: Date,
        default: Date.now()
    },
    status:{
        type: String
    },
    tag:{
        type: String
    }
})

module.exports = User = mongoose.model('posts', PostSchema)