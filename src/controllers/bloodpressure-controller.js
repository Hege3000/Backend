import { getBloodPressureByUserId, addBloodPressure,updateBloodPressure, deleteBloodPressure } from '../models/bloodpressure-model.js';

const getBloodPressures = async (req, res) => {  //  async koska tietokanta haku -> voi kestää
 
  try {
    
    const userId = req.user.user_id; // haetaan tokenista
    const result = await getBloodPressureByUserId(userId);
    res.json(result);
  } catch (e) {
    console.error('error', e.message);
    res.status(500).json({message: 'error fetching blood pressures'});
  }
};

// haetaan yksittäinen mittaustulos ID:n perusteella
const getBloodPressureById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.user_id;

  try {
    const result = await getBloodPressureById(id, userId);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: 'Entry not found or not authorized' });
    }
  } catch (e) {
    console.error('error', e.message);
    res.status(500).json({ message: 'Error fetching blood pressure entry' });
  }
};
// lisätään uusi verenpainemittaus tietokantaan
const postBloodPressure = async (req, res) => {
  const { systolic, diastolic, pulse, measured_at, notes } = req.body;

  //  validointi: Verenpaineessa ylä- ja alapaine ovat pakollisia
  if (!systolic || !diastolic) {
    return res.status(400).json({ message: 'Systolic and diastolic values are required' });
  }

  try {
    // kootaan data objektiin. Jos pulse tai notes puuttuu, käytetään nullia/tyhjää.
    // jos measured_at puuttuu, tietokanta voi käyttää oletusarvoa tai voit antaa sen tässä.
    const result = await addBloodPressure({
      user_id: req.user.user_id, // haetaan kirjautuneen käyttäjän id tokenista
      systolic,
      diastolic,
      pulse: pulse || null, // annetaan OR oletusarvo 
      measured_at: measured_at || new Date().toISOString().slice(0, 19).replace('T', ' '), // muokataan JS:n ja SQL:n eroavat aikamuodot MariaDB:lle sopiviksi
      notes: notes || null
    });

    // palautetaan onnistumisviesti ja uuden rivin ID
    res.status(201).json({ message: 'New blood pressure entry added', id: result.bp_id });
  } catch (e) {
    console.error('error', e.message);
    res.status(500).json({ message: 'Error saving blood pressure' });
  }
};

// Päivitetään olemassa oleva merkintä
const putBloodPressure = async (req, res) => {
  const { id } = req.params; // ID tulee URL-osoitteesta, esim. /api/bloodpressure/6
  
  const { systolic, diastolic, pulse, notes } = req.body;
  const userId = req.user.user_id; // haetaan tokenista

  // Perusvalidointi: ylä- ja alapaine ovat pakollisia [cite: 13]
  if (!systolic || !diastolic) {
    return res.status(400).json({ message: 'Systolic and diastolic values are required' });
  }

  try {
    const success = await updateBloodPressure(id, userId, {
      systolic,
      diastolic,
      pulse: pulse || null,
      notes: notes || null
    });

    if (success) {
      res.json({ message: 'Blood pressure entry updated' });
    } else {
      res.status(404).json({ message: 'Entry not found or not authorized' }); 
    }
  } catch (e) {
    console.error('error', e.message);
    res.status(500).json({ message: 'Error updating blood pressure' }); 
  }
};

// Poistetaan merkintä
const deleteBloodPressureEntry = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.user_id; // haetaan tokenista
 
  try {
    const success = await deleteBloodPressure(id, userId);
    
    if (success) {
      res.json({ message: 'Blood pressure entry deleted' });
    } else {
      res.status(404).json({ message: 'Entry not found or not authorized' });
    }
  } catch (e) {
    console.error('error', e.message);
    res.status(500).json({ message: 'Error deleting blood pressure' }); 
  }
};


export { getBloodPressures, postBloodPressure, putBloodPressure, deleteBloodPressureEntry, getBloodPressureById };




