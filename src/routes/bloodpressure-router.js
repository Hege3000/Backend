import express from 'express';
import {
  getBloodPressures,
  postBloodPressure,
  putBloodPressure,
  deleteBloodPressureEntry,
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

// mittaustuloksen muutos ID:n mukaan  polkuun /api/bloodpressure/**)
bloodPressureRouter
  .route('/:id')
  .put(putBloodPressure)           // muokkaa olemassa olevaa 
  .delete(deleteBloodPressureEntry); // poista  

// Clauden debuggausta
bloodPressureRouter.delete('/test', (req, res) => {
  res.json({ test: 'router toimii' });
});
// tähän asti


export default bloodPressureRouter;
