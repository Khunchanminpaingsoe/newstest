const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema ({
    catname:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    time : { type: Number, 
    default: (new Date()).getTime() 
    }
})

const news = mongoose.model('news', newsSchema);
module.exports = news;