import multer from "multer"

const storage = multer.diskStorage({
      destination:(req,file,cb) => {
            cb(null, "./public/temp");
      },
      filename : (req, file, cb) =>{
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.originalname)
      }
})

// const fileFilter =(req, file, cb)=>{
//       const allowedTypes =["images/jpeg","images/png", "image/jpg"];
//       if(allowedTypes.includes(file.mimetype)){
//             cb(null,true)
//       } else {
//             cb(new Error("Only images are allowed"), false)
//       }
// }

export const upload = multer({
      storage,
      limits: {fileSize: 5 * 1024 * 1024}
})