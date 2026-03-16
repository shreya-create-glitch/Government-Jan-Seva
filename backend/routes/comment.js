const express=require('express');
const router=express.Router();
const verifyToken=require("../middleware/auth");

const { getcomment, comment } = require('../controllers/comment');

router.post("/:id",verifyToken,comment);
router.get("/:id",getcomment);

module.exports=router;