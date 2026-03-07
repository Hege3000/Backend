import express from 'express';
import {
  getBloodPressures,
  postBloodPressure,
  putBloodPressure,
  deleteBloodPressureEntry,
  } from '../controllers/bloodpressure-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';  

const bloodPressureRouter = express.Router();

// muutettu verenpaineelle ystävällisiksi (All endpoints for 'items' resource)

bloodPressureRouter
  // define route
  .route('/')
  // hae käyttäjän kaikki verenpaineen mittaustulokset
  .get(authenticateToken, getBloodPressures)
  // lisää käyttäjän uusi verenpaineen mittaustulos
  .post(authenticateToken, postBloodPressure);

// mittaustuloksen muutos ID:n mukaan  polkuun /api/bloodpressure/**)
bloodPressureRouter
  .route('/:id')
  .put(authenticateToken, putBloodPressure)           // muokkaa olemassa olevaa 
  .delete(authenticateToken, deleteBloodPressureEntry); // poista  mittaustulos



export default bloodPressureRouter;
