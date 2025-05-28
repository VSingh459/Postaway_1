import exp from 'express';
import LikeController from './like.controller.js';

const  likeRouter = exp.Router();
const liker = new LikeController();

likeRouter.post('/add', liker.addo);
likeRouter.delete('/delete', liker.delo);
likeRouter.get('/total',liker.totalLikesonPost);

export default likeRouter;