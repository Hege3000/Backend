import promisePool from '../utils/database.js';


// TODO: lisää modelit ja muokkaa kontrollerit reiteille:
// GET /api/users - list all users
// GET /api/users/:id - get user by id
// POST /api/users - add a new user

// Huom: virheenkäsittely puuttuu
const findUserByUsername = async (username) => {
  const sql = 'SELECT * FROM Users WHERE username = ?';
  const [rows] = await promisePool.execute(sql, [username]);
  return rows[0];
};

// haetaan kaikki käyttäjät - kaikki rivit Users-taulusta 
const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM Users');
  return rows;
};
// Haetaan yksi käyttäjä ID:n perusteella - execute-metodi ja ? (SQL-injektio) 
const findUserById = async (id) => {
  const [rows] = await promisePool.execute('SELECT * FROM Users WHERE user_id = ?', [id]);
  return rows[0];
};
// Lisätään uusi käyttäjä tietokantaan
const addUser = async (user) => {
  const {username, password, email} = user;
  const sql = 'INSERT INTO Users (username, password, email) VALUES (?, ?, ?)';
  const [result] = await promisePool.execute(sql, [username, password, email]);
  return {user_id: result.insertId};
};

export {findUserByUsername, listAllUsers, findUserById, addUser};
