import express from "express";
import {
      createCrimeReport,
      getAllCrimes,
      getUserCrimes,
      updateCrimeStatus,
      deleteCrimeReport
} from "../controllers/crimeController.js";
import { protect } from "../middlewares/authMiddleware.js";
import {upload} from "../middlewares/multer.js"

const router = express.Router();

router.post("/",
      upload.fields([
            {
                  name:"image",
                  maxCount:2
            }
            
      ]),protect, createCrimeReport);
router.get("/",protect, getAllCrimes);
router.get("/user",protect, getUserCrimes);
router.put("/:id",protect, updateCrimeStatus);
router.delete("/:id",protect, deleteCrimeReport);


export default router;

