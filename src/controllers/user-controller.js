// HUOM: mokkidata on poistettu modelista
//import users from '../models/user-model.js';

import {findUserByUsername, listAllUsers, findUserById, addUser} from '../models/user-model.js';


// TODO: lisää tietokantafunktiot user modeliin
// ja käytä niitä täällä
// TODO: refaktoroi(paranna?) tietokantafunktiolle


const getUsers = async (req, response) => { //odottelua tiedossa
  const users = await listAllUsers();   
  response.json(users);
};
  
// TODO: getUserById
// TODO: putUserById
// TODO: deleteUserById

// Käyttäjän lisäys (rekisteröityminen)

const postUser = async (req, res) => { 
  const newUser = req.body;
  // Uusilla käyttäjillä pitää olla kaikki vaaditut ominaisuudet tai palautetaan virhe
  // itse koodattu erittäin yksinkertainen syötteen validointi
  if (!(newUser.username && newUser.password && newUser.email)) {
    return res.status(400).json({error: 'required fields missing'});
  }
  console.log('registering new user', newUser);
 
  // luodaan uusi objekti, joka sisältää id-ominaisuuden ja kaikki newUserObjektin
  // ominaisuudet ja lisätään users-taulukon loppuun
  const result = await addUser(newUser);
  
    res.status(201).json({message: 'new user added', user_id: result.user_id});
};
const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    delete user.password;
    res.json(user);
  } else {
    res.status(404).json({error: 'user nopt found'});
  }
};

// Tietokantaversio valmis
const postLogin = async (req, res) => {
  const {username, password} = req.body;
  // haetaan käyttäjä-objekti käyttäjän nimen perusteella
  const user = await findUserByUsername(username);
  //console.log('postLogin user from db', user);
  if (user) {
    if (user.password === password) {
      delete user.password;
      return res.json({message: 'login ok', user: user});
    }
    return res.status(403).json({error: 'invalid password'});
  }
  res.status(404).json({error: 'user not found'});
};

export {getUsers, postUser, postLogin, getUserById};
