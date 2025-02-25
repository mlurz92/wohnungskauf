const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/AppointmentController');
const auth = require('../utils/auth');

module.exports = (db) => {
  const controller = AppointmentController(db);
  router.get('/', auth, controller.getAppointments);
  router.post('/', auth, controller.addAppointment);
  router.put('/', auth, controller.updateAppointment);
  return router;
};