const express=require("express");
const verifyToken=require('../middleware/auth');
const getAnalyticsData = require("../controllers/analytics");

const router=express.Router();

router.get("/analytics",verifyToken,getAnalyticsData);
module.exports=router;


