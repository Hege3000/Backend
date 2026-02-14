import express from 'express';
import {getUsers, postLogin, postUser} from '../controllers/user-controller.js';

const userRouter = express.Router();

// Users resource endpoints
userRouter.route('/')
// GET all users
.get(getUsers)
// POST new user
.post(postUser);

// POST user login
userRouter.post('/login', postLogin);

// TODO: get user by id
// app.get('/api/users/:id');
// TODO: put user by id
// TODO: delete user by id

export default userRouter;
