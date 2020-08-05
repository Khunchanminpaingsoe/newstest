const express = require('express');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const {v1: uuidv1} = require('uuid');
const router = express.Router();
const mv = require('mv');


const newsModel = require('../models/news_model');
const catsModel = require('../models/categories_model');
const relatedModel = require('../models/related_news');

router.get('/', (req, res) => { 
    res.render('catscreate');
});


router.get('/news/createget', (req, res) => {
    newsModel.find({}).sort({"title": 1}).populate('catname','name')
    .then((data) => {
        res.send(data);
       //res.render('view_all', {
         //   datas: data
        })
    .catch(err => console.log(err));
    });
    

router.get('/news/createget/:id', (req, res) => {
    catsModel.findById({ _id: req.params.id }).populate('news_detail')
    .then((data) => {
        res.send(data.news_detail);
    })
    .catch(err => console.log(err));
    });


router.post('/news/createpost/:id', async (req, res) => {
        let {id} = req.params;
        let form = new formidable.IncomingForm();
        form.parse(req,async (err,fields,files)=>{
            const newPath = 'uploads/' + uuidv1() + files.image.name;
           mv(files.image.path,newPath,async(err)=>{
               if(err){
                   console.log(err);
               }else{
                const bodys = {
                    
                    title: fields.title,
                    image: newPath,
                    content: fields.content }
    
                    const news = new newsModel(bodys);
                    const catid = await catsModel.findById(id);
                    news.catname = catid;
                    await news.save();
                    if(Array.isArray(catid.news_detail)){
                    catid.news_detail.push(news);
                    //catid.related_news.push(news);
                    await catid.save()
                    .then((data) => {
                        res.send(data);
                    })
                    .catch(err => console.log(err));
                    }                
                    //res.send(news);
               }
           });
        });
    });

   
/*router.get('/news/update/:id', (req, res) => {
    newsModel.findById({_id: req.params.id})
    .then((data) => {
        res.render('update', {
            data: data
        });
    }); 
});*/


router.put('/news/update/:id', (req, res) => {
    newsModel.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then((data) => {
        console.log(data);
        res.send(data);
        //res.redirect('/createget');
    })
    .catch(err => console.log(err));  
});


router.delete('/news/delete/:id', (req, res) => {
    newsModel.findByIdAndRemove({_id: req.params.id})
    .then((data) => {
        res.send(data);
    })
    .catch(err => console.log(err));
});


//About Categories

router.get('/cats/createget',(req, res) => {
     catsModel.find({}).sort({"name": 1})
    .then((data) => {
        res.send(data);
       /* res.render('catscreate',{
            datas: data
        });*/
        
    })
    .catch(err => console.log(err));
});


router.get('/cats/createget/:id', (req, res) => {
    const catid = catsModel.findById({ _id: req.params.id }).populate('news_detail');
    catid
    .then((data) => {
        res.send(data.news_detail);
    })
    .catch(err => console.log(err));
    });;


router.post('/cats/createpost', (req, res) => {
    const cat = new catsModel(req.body);
    cat.save()
    .then((data) => {
        console.log(data);
        res.send(data);
        //res.redirect("back");

    })
    .catch(err => console.log(err));
});


router.post('/cats/createpost/:id', async (req, res) => {
    let {id} = req.params;
    let form = new formidable.IncomingForm();
    form.maxFieldsSize = 2 * 1024 ;
    form.parse(req,async (err,fields,files)=>{
        const newPath = 'uploads/' + uuidv1() + files.image.name;
       mv(files.image.path,newPath,async(err)=>{
           if(err){
               console.log(err);
           }else{
            const bodys = {
                
                title: fields.title,
                image: newPath,
                content: fields.content }

                const news = new newsModel(bodys);
                const catid = await catsModel.findById(id);
                news.catname = catid;
                await news.save();
                if(Array.isArray(catid.news_detail)){
                catid.news_detail.push(news);
                await catid.save()
                .then((data) => {
                    res.send(data);
                })
                .catch(err => console.log(err));
                }                
           }
       });
    });
});

router.put('/cats/update/:id', (req, res) => {
    catsModel.findByIdAndUpdate({_id: req.params.id},req.body)
    .then((data) => {
        console.log(data);
        res.send(data);
        //res.redirect('/createget');
    })
    .catch(err => console.log(err));  
});


router.delete('/cats/delete/:id', (req, res) => {
    catsModel.findByIdAndRemove({_id: req.params.id})
    .then((data) => {
        res.send(data);
    })
    .catch(err => console.log(err));
});

module.exports = router;