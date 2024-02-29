const  express = require('express');
const { addVehicle,getVehicle} = require('../controllers/vehicleController')
const userAuth = require('../middleware/userAuth')
const router=express.Router()

router.use(userAuth)

router.post("/add",addVehicle)
router.get("/get",getVehicle)


module.exports = router

