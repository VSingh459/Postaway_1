import exp from 'express';
import  CommentController from './comment.controller.js';

const cRouter = exp.Router();
const com = new CommentController();

cRouter.post('/add', com.adder);
cRouter.get('/retrieve', com.getAllComments);
cRouter.delete('/delete', com.deleteComment);



export default cRouter;