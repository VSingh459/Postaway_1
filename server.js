import exp from 'express';
import swagger from 'swagger-ui-express';

import uRouter from './src/features/user/user.routes.js';
import pRouter from './src/features/post/post.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cRouter from './src/features/comment/comment.routes.js'
import likeRouter from './src/features/like/like.routes.js';
import apiDocs from './swagger.json' assert{type:'json'};
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import {ApplicationError} from './src/error-handler/applicationError.js';


const server = exp();
server.use(exp.json());
server.use('/api-docs',swagger.serve, swagger.setup(apiDocs));
server.use(loggerMiddleware);

server.use('/api/users', uRouter);
server.use('/api/posts', jwtAuth, pRouter);
server.use('/api/comments', jwtAuth, cRouter);
server.use('/api/likes', jwtAuth, likeRouter);



server.get('/', (req,res)=>{
    res.send(`Welcome to Veer's Social Networking Website`);
});

//Middleware to handle 404 requests
server.use((req,res)=>{
    res.status(404).send("API not found");
});

// Error Handler middleware
server.use((err,req,res,next)=>{
    console.log(err);
    if (err instanceof ApplicationError){
        res.status(err.code).send(err.message);
      };

    res.status(500).send('Something went Wrong. Please try again later!!!');
});

server.listen(3300, function(){
    console.log('Server is listening at port-3300');
});