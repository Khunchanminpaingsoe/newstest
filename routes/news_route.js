const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const newsModel = require('../models/news_model');
//const news = require('../models/news_model');

router.get('/news', (req, res) => {
    newsModel.find({})
    .then((data) => {
        res.send(data);
    })
    .catch(err => console.log(err));
    });

router.post('/news', (req, res) => {
    const news = new newsModel(req.body);
    news.save()
    .then((data) => {
        console.log(data);
        res.send(data);
    })
    .catch( err => console.log(err));
});

router.put('/news/:id', (req, res) => {
    newsModel.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then((data) => {
        res.send(data);
    })
    .catch(err => console.log(err));  
});

router.delete('/news/:id', (req, res) => {
    newsModel.findByIdAndRemove({_id: req.params.id})
    .then((data) => {
        res.send(data);
    })
    .catch(err => console.log(err));  
});


module.exports = router;