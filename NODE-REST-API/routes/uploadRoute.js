const express = require('express');
const path = require('path');
const multer= require('multer')

const router=express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, 'public/images');
    },
    filename:(req, file, cb)=> { 
      cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
  })
  const checkFile=(file,cb)=>{
       const filetypes=/jpg|jpeg|png/
       const extname=filetypes.test(path.extname(file.originalname).toLowerCase())
       const mimetype=filetypes.test(file.mimetype)

       if(filetypes && mimetype){
           return cb(null,true)
       }
       else{
           cb("Images only")
       }
  }
 
  const upload = multer({ 
      storage,
      fileFilter:function (req, file, cb){
          checkFile(file,cb)
      }
 })

router.post("/",upload.single("file"),(req,res)=>{
    res.send(`${req.file.filename}`)

})

module.exports = router