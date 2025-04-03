import Crime from "../models/Crime.js";
import { sendEmail } from "../utils/emailService.js";
import User from "../models/User.js";

// create a crime report
export const createCrimeReport = async(req, res)=>{
      try {
            console.log("Received :", req.body)
           const {title, description, location} = req.body;
            
            
           const newCrime= new Crime({
            title,
            description,
            location,
            reportedBy: req.user.id,
            status: "Pending"
           });

           await newCrime.save();
           const policeOfficers = await User.find({role: "police"});
           console.log(newCrime.reportedBy.email)

      //      notify police officers
           policeOfficers.forEach((officer)=>{
            sendEmail(
                  officer.email,
                  "New Crime Reported",
                  `A new crime has been reported: \n\nTitle: ${title}\nDescription: ${description}\nLocation:${location}`
            )
           });
           
           res.status(201).json({message: "Crime Reported Successfully",newCrime});

      } catch (error) {
            console.log("error",error);
            
            res.status(500).json({message: "Error reporting crime"})
      }
};
// Get all crime reports(Admin & Police)
export const getAllCrimes = async(req, res) =>{
      try {
            const crimes = await Crime.find().populate("reportedBy", "name email").populate("assignedTo", "name email")
            
            res.status(200).json(crimes)
      } catch (error) {
            res.status(500).json({message: "Error fetching crimes"})
      }
}

// Get crimes reported by a specific user(Citizen)

export const getUserCrimes = async(req,res) =>{
      try {
            const crimes = await Crime.find({reportedBy: req.user.id});
            res.status(200).json(crimes)
      } catch (error) {
            res.status(500).json({message: "Error fetching User crimes"})
      }
}

// Update crime status (Only police & admin)

export const updateCrimeStatus = async (req, res) => {
      try { 
            if(req.user.role !== "police"){
                  res.status(403).json({message: "Access Denied"})
            }
            const {status} = req.body;
            if(!["Pending","In Progress","Resolved"].includes(status)){
                  res.status(400).json({message: "Invalid status Update"})
            }
            const crime = await Crime.findById(req.params.id);
            if(!crime) res.status(404).json({message:"Crime not found"});

            crime.status = status;
            await crime.save();
             const recipientEmail = crime.reportedBy.email;
             console.log(recipientEmail);
            //Notify the user
            sendEmail(
                  crime.reportedBy.email,
                  "Crime Status Updated",
                  `Your crime report "${crime.title}" is now marked as "${status}".`
            )
            res.status(200).json({message: "Crime Status updated", crime})
      } catch (error) {
            console.log(error);
            
            res.status(500).json({message: "Error updating  crime status"})
      }
      
} 

// delete a crime report(Only admin)
export const deleteCrimeReport = async (req, res) => {      
      try {
            const crime = await Crime.findById(req.params.id);
            if(!crime) res.status(404).json({message:"Crime not found"});
            
            await crime.deleteOne();
            res.status(200).json({message: "Crime report deleted"})



      } catch (error) {
            res.status(500).json({message: "Error deleting  crime report"});
      }
      
}