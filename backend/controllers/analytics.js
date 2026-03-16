const complaint=require('../model/complaint');

const getAnalyticsData=async(req,res)=>{
   
         if(req.user.role=='admin'){
              try {
            const totalComplaint=await complaint.countDocuments();
            const resolved=await complaint.countDocuments({status:"resolved"});
            const pending=await complaint.countDocuments({status:"pending"});
res.status(200).json({ 
  totalComplaints: totalComplaint, 
  resolved, 
  pending 
});

          } catch (error) {
              res.status(500).json({ message: "Failed to fetch analytics", error });
          }
         }
          
         }
    

module.exports=getAnalyticsData;