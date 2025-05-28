import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next)=>{
    // 1. Read the token.
    const token = req.headers['authorization'];

    // 2. if no token, return the error.
    if(!token){
        return res.status(401).send('Unauthorized');
    }
    // 3. check if token is valid.
    try{
        const payload = jwt.verify(
            token,
            '760e7516ef848e2bfaf55f8f8710de41442a80b7d860041a610c45fd71308645'
        );
        req.user = { userId: payload.userId };
        console.log(payload);
    } catch(err){s
        // 4. return error.
        console.log(err);
        return res.status(401).send('Unauthorized');
    }

    // 5. call next middleware.
    next();
};

export default jwtAuth;