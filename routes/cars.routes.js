const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload-image');

const carController = require('../controllers/cars.controllers');

router.get("/", carController.getAll);
router.get("/:id", carController.getSingle);
router.post("/add", upload.single('carImage') ,carController.addCar);

module.exports = router;