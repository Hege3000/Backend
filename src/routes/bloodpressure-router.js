import express from 'express';
import {
  getBloodPressures,
  postBloodPressure,
  } from '../controllers/bloodpressure-controller.js';

const bloodPressureRouter = express.Router();

// muutettu verenpaineelle ystävällisiksi (All endpoints for 'items' resource)

bloodPressureRouter
  // define route
  .route('/')
  // hae käyttäjän kaikki verenpaineen mittaustulokset
  .get(getBloodPressures)
  // lisää käyttäjän uusi verenpaineen mittaustulos
  .post(postBloodPressure);






export default bloodPressureRouter;
