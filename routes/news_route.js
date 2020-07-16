const express = require('express');
const multer = require('multer');
const router = express.Router();


//const mongoose = require('mongoose');

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb (null, 'uploads/');
    },
    filename : (req,file,cb)=>{
        cb(null, file.fieldname + '_' + Date.now() + file.originalname);
      //cb(null, new Date().toISOString() + file.originalname);
    }
  });
  
const upload = multer({storage: storage});
const newsModel = require('../models/news_model');

router.get('/news', (req, res) => {
    newsModel.find({})
    .then((data) => {
        res.send(data);
    })
    .catch(err => console.log(err));
    });

router.get('/news/:catname', (req, res) => {
    newsModel.findOne({ catname: req.params.catname })
    .then((data) => {
        res.send(data);
    })
    .catch(err => console.log(err));
    });

router.post('/news', upload.single('image'), (req, res) => {
    //console.log(req.file);
    const news = new newsModel({
    catname: req.body.catname,
    title: req.body.title,
    image: req.file.path,
    content: req.body.content 
    });
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