const express = require("express")
const router = express.Router();
const {create,conversations} = require("../controllers/chat")

/**
 * @route POST /chat
 * @desc Post new  Message
 */
router.post("/",create)
router.get("/",conversations)


module.exports=router;