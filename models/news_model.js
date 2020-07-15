const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema ({
    content:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const news = mongoose.model('news', newsSchema);
module.exports = news;