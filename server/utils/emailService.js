import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth:{
            user:process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
      }
});


export const sendEmail = async (to, subject, text) => {
    try {
      await transporter.sendMail({
            from: `"Crime Management System" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
      });
      console.log(`Email sent to ${to}`);
      
    } catch (error) {
      console.log("Email sending failed:", error);
      
    }  
}