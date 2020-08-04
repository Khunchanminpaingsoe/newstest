const mongoose = require('mongoose');

const relatedSchema = new mongoose.Schema ({
    catname:{
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: 'news'
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
        type: Number, 
        default: (new Date()).getTime() 
    }
    
})

const relatednews = mongoose.model('relatednews', relatedSchema);
module.exports = relatednews;
