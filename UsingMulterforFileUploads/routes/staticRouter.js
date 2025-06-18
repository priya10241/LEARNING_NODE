const express = require("express");
const multer = require("multer");
const router = express.Router();

router.get("/", (req,res)=>{
    res.render("home");
})

// // Method1 : But in this method, we cannot open file and edit file properties like name and all.
// const upload = multer({dest : "./uploads"});
// router.post("/uploadFile", upload.single("profileImage"), (req, res)=>{
//     console.log(req);
//     console.log("File uploaded");
//     res.redirect("/");
// })


//Method2 : we can edit file name (Better method)
const storage = multer.diskStorage({
    destination : function(req,file,cb){  //here file is the file user uploaded and cb is callback
        cb(null, "./uploads");
    }, 
    filename : function(req,file,cb){
        cb(null, `${Date.now()} - ${file.originalname}`);
    }
})

const upload = multer({storage : storage});
router.post("/uploadFile", upload.single("profileImage"), (req, res)=>{
    console.log("File submitted Successfully");
    res.redirect("/");
})


module.exports = router;