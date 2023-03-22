const express=require('express');
const router=express.Router();
const notificationcontroller=require("../controllers/notifications");
router.get('/notify',notificationcontroller.notify);
module.exports=router;