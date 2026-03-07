import promisePool from '../utils/database.js';

// haetaan mittaustulos mittaustuloksen ID: perusteella
const getBloodPressureByUserId = async (userId) => {
  const [rows] = await promisePool.query(
    'SELECT * FROM BloodPressure WHERE user_id = ? ORDER BY measured_at DESC',
    [userId]
  );
  return rows;
};
// lisätään mittaustulos ja annetaan sille ID
const addBloodPressure = async (bpData) => {
  const { user_id, systolic, diastolic, pulse, measured_at, notes } = bpData;
  const sql = `INSERT INTO BloodPressure (user_id, systolic, diastolic, pulse, measured_at, notes)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const [result] = await promisePool.execute(sql, [user_id, systolic, diastolic, pulse, measured_at, notes]);
  return { bp_id: result.insertId };
};

// mahdollisuus päivittää/muokata tallennettua päivitystä mittauksen ID:n perusteella 
const updateBloodPressure = async (bpId, userId, bpData) => {
  const { systolic, diastolic, pulse, notes } = bpData;
  const sql = `UPDATE BloodPressure 
               SET systolic = ?, diastolic = ?, pulse = ?, notes = ? 
               WHERE bp_id = ? AND user_id = ?`;
  const [result] = await promisePool.execute(sql, [systolic, diastolic, pulse, notes, bpId, userId]);
  return result.affectedRows > 0;
};

// mahdollisuus poistaa mittaus mittauksen ID:n perusteella
const deleteBloodPressure = async (bpId, userId) => {
  const sql = `DELETE FROM BloodPressure WHERE bp_id = ? AND user_id = ?`;
  const [result] = await promisePool.execute(sql, [bpId, userId]);
  return result.affectedRows > 0;
};





export { getBloodPressureByUserId, addBloodPressure, updateBloodPressure, deleteBloodPressure  };
