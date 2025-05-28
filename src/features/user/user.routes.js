import exp from 'express';
import UserController from './user.controller.js';

const uRouter = exp.Router();

const cont = new UserController();

uRouter.post('/signup', cont.signUp);
uRouter.post('/signin', cont.signIn);

export default uRouter;