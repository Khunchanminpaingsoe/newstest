const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    news_detail: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'news'
    }],
    created_date:{
        type: Date,
        default: Date.now
    }
    

});

const category = mongoose.model('categories', catSchema);
module.exports = category;
