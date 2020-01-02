const carsController = {};
const Cars = require('../models/cars.model');
require('dotenv').config();

const mongoose = require('mongoose');


carsController.getSingle = async (req, res) => {

  const result = Cars.findById(req.params.id).then(
    carFound => {
      if(!carFound) { return res.status(404).end();}
      else {
      return res.status(200).json(carFound);
    }
    }).catch(err => console.log(err));
    res.setHeader('Content-Type', 'image/jpeg');

}

carsController.getAll = async (req, res) => {
    let cars;
    try {
        let merged = {};
        const start = 0;
        const length =100;
        cars = await Cars.paginate(
            merged,
            {
                offset: parseInt(start),
                limit: parseInt(length)
            }
        ),
        res.status(200).send({
            code: 200,
            message: 'Successful',
            data: cars
        });
        res.setHeader('Content-Type', 'image/jpeg');
    } catch(error) {
        console.log('error', error);
        return res.status(500).send(error);
    }
};

carsController.addCar = async (req, res) => {
    try {
    //req.  const body = req.body;
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
  
      const car = new Cars({
        _id: new mongoose.Types.ObjectId(),
        reg: req.body.reg,
        model: req.body.model,
        make: req.body.make,
        year: req.body.year,
        color: req.body.color,
        milage:req.body.milage,
        price: req.body.price,
        status: req.body.status,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        imageUrl: 'http://localhost:3000/uploads/cars/' + year + '_' + month + '_' + day + '_' + req.file.originalname
      });
  
    // eslint-disable-next-line no-unused-vars
    const result = await car.save();
  
      res.status(200).send({
        code: 200,
        message: 'Car Added Successfully',
      });
    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };
  module.exports = carsController;