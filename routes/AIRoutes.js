import { Router } from "express";
import { addData, deleteData, getData } from "../controllers/AIController.js";
import { upload } from "../config/multer-config.js";

const router = Router();

router.get("/", getData);

router.post("/", upload.single("image"), addData);

router.delete("/:id", deleteData);

export default router;
