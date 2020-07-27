const express = require('express');
//const multer = require('multer');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const detect = require('detect-file-type');
const {v1: uuidv1} = require('uuid');
const router = express.Router();
const mv = require('mv');

/*const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb (null, './uploads/');
    },
    filename : (req,file,cb)=>{
        cb(null, file.fieldname + '_' + Date.now() +  path.extname(file.originalname));
    }
  });
  
const upload = multer({storage: storage, limits: 1000000, fileFilter: (req, file, cb)=>{ checkFileType(file, cb);}});
function checkFileType(file, cb){

    const filetypes = /jpg|jpeg|png|gif/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    }else{
        cb('Error: Image Only');
    }
}*/
const newsModel = require('../models/news_model');

router.get('/', (req, res) => { 
    res.render('create');
});

router.get('/createget', (req, res) => {
    
    /*const data = {
        catname: req.params.catname,
        title: req.params.title,
        image: "uploads/" + req.params.image,
        content: req.params.content

    }*/
    newsModel.find({})
    .then((data) => {
       res.render('view_all', {
            datas: data
                    //});
    })
    .catch(err => console.log(err));
    });
});

router.get('/news/:catname', (req, res) => {
    newsModel.findOne({ catname: req.params.catname })
    .then((data) => {
        res.send(data);
    })
    .catch(err => console.log(err));
    });

    //router.post('/createpost', upload.single('image'), (req, res) =>
router.post('/createpost',(req,res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        var oldpath = files.image.path;
        console.log(oldpath);
       
        var newpath = 'uploads/'+new Date().toISOString()+files.image.name;
       mv(oldpath, newpath, function(err) {
            if(err){
                console.log(err)
            }
            else{
                console.log('newpath')
            }
          });
    })

})
router.get('/update/:id', (req, res) => {
    newsModel.findById({_id: req.params.id})
    .then((data) => {
        res.render('update', {
            data: data
        });
    }); 
});

router.put('/update/:id', (req, res) => {
    newsModel.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then((data) => {
        res.send(data);
        //res.redirect('/createget');
    })
    .catch(err => console.log(err));  
});

router.get('/delete/:id', (req, res) => {
    newsModel.findByIdAndRemove({_id: req.params.id})
    .then(() => {
        res.redirect('back');
    })
    .catch(err => console.log(err));  
});


module.exports = router;