const complaint=require("../model/complaint");
const mongoose = require("mongoose");
const User = require("../model/user"); 


const postComplaint = async (req, res) => {
  const { title, description, locality, category } = req.body;
  const imageFile = req.file; 

  try {
    const newComplaint = await complaint.create({
      title,
      description,
      locality,
      category,
      // image: imageFile ? imageFile.filename : null,
      image: req.file ? req.file.path : null,
      // image: imageFile ? imageFile.path : null,
      user:req.user.userId,
    
    });
    const user=await User.findById(req.user.userId);
    if(user){
      user.complaintCount +=1;
      if(user.complaintCount>=1 && user.complaintCount<3){
        user.badge="Bronze"
      }
      else if(user.complaintCount>=3 && user.complaintCount<4){
        user.badge="Silver"
      }
      else {
        user.badge="Gold";
      }
      await user.save();
    }

    res.status(200).json({ message: "complaint created", newComplaint });
  } catch (error) {
    console.error("Error while creating complaint:", error);
    res.status(500).json({
      message: "something went wrong",
      error: error.message || error,
    });
  }
};

const getComplaint = async (req, res) => {
  try {
    const complaints = await complaint.find({})
       .populate("user")

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};






const updateComplaintStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const complaintItem = await complaint.findById(id);

    if (!complaintItem) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaintItem.status = status;
    await complaintItem.save();

    res.status(200).json({ message: "Status updated", complaint: complaintItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



const increaseComplaintCount = async (req, res) => {
  const { id } = req.params;

  try {
    const complaintItem = await complaint.findById(id);

    if (!complaintItem) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    
    if (complaintItem.user?.toString() === req.user.userId.toString()) {
      return res.status(403).json({ message: "You cannot increase count on your own complaint" });
    }

    complaintItem.count = (complaintItem.count || 0) + 1;
    await complaintItem.save();

    res.status(200).json({ message: "Count increased", newCount: complaintItem.count });

  } catch (error) {
    console.error("Error in increaseComplaintCount:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



module.exports={postComplaint,getComplaint,updateComplaintStatus,increaseComplaintCount};