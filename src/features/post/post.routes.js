import exp from 'express';
import PostController from './post.controller.js';
import {upload} from '../../middlewares/fileUpload.middleware.js';


const pRouter = exp.Router();
const pp = new PostController();

pRouter.post('/add',upload.single('imageUrl'), pp.addPost);
pRouter.get('/userId', pp.getPostsByUserId);
pRouter.get('/:postId', pp.getPostById);
pRouter.put('/update',upload.single('imageUrl'), pp.updatePost);
 pRouter.delete('/delete', pp.delPost);


export default pRouter;


