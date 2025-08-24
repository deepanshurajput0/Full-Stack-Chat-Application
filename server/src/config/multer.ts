import multer from "multer";

const storage = multer.diskStorage({}); // store file temporarily
const upload = multer({ storage });

export default upload;
