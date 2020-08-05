const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema ({
    catname:{
       type: mongoose.Schema.Types.ObjectId,
       required: true,
        ref: 'categories'
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
    time:{ 
        type: Date,
        default: Date.now
    }
    
})

const news = mongoose.model('news', newsSchema);
module.exports = news;
