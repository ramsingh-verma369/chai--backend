import { Router } from "express";
import { regiserUser } from "../controllers/user.controller.js";

const router = Router();
router.route("/register").post(regiserUser)


export default router