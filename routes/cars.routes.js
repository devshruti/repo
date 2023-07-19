// routes/cars.routes.js
const express = require('express');
const { auth } = require('../middleware/auth.middleware');
const { CarModel } = require('../models/cars.model');
const carsRouter = express.Router();

// carsRouter.use(auth);

carsRouter.post('/add', async (req, res) => {
  try {
    const car = new CarModel(req.body);
    await car.save();
    res.status(200).json({ msg: 'Car added', addedCar: { _id: car._id, ...req.body } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

carsRouter.get('/', async (req, res) => {
  try {
    const cars = await CarModel.find(req.query);
    res.status(200).json({ cars });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

carsRouter.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    await CarModel.findByIdAndUpdate({ _id: id }, payload);
    const updatedCar = await CarModel.findById(id);
    res.status(200).json({ msg: 'Car has been updated', updatedCar });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

carsRouter.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCar = await CarModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ msg: 'Car has been deleted', deletedCar });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = { carsRouter };
