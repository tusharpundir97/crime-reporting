import express from "express";
import { sendEmail } from "../utils/emailService.js";

const router = express.Router();

router.post("/test",async (req,res) => {
      const { to, subject, text} = req.body;
      try {
           await sendEmail(to, subject, text);
           res.status(200).json({message:"Test Email sent successfuly"}) 
      } catch (error) {
            res.status(500).json({message:"Failed to send email",error})
      }
})

export default router;