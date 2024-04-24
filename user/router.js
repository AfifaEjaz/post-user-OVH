import express from "express"
const router = express.Router()
import { getUser, addUser} from "./controller.js"

router.get("/getuser", getUser)
router.post("/adduser", addUser)

export default router