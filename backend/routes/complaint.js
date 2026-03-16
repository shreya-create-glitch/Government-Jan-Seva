const verifyToken=require("../middleware/auth");
const express = require("express");
const multer = require("multer");
const { postComplaint, getComplaint, updateComplaintStatus, increaseComplaintCount } = require("../controllers/complaint");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/",verifyToken, upload.single("image"), postComplaint);
router.get("/", getComplaint);
router.put("/count/:id",verifyToken,increaseComplaintCount)

router.put("/:id",verifyToken,updateComplaintStatus);
module.exports = router;
