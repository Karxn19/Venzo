const express = require('express');
const app = express();
const bikeController = require('./../controllers/bikeController');

const router = express.Router();

router
    .route('/')
    .get(bikeController.getAllBikes)
    .post(bikeController.createBike);

router
    .route('/bike-stats')
    .get(bikeController.getBikeStats)
router
    .route('/:id')
    .get(bikeController.getBikeById)
    .patch(bikeController.changeImage) 
    .delete(bikeController.deleteBike)

module.exports = router;