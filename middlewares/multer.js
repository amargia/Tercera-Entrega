import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/userImages')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
  
const upload = multer({ storage: storage })

export { upload };