
import UserModel from './user.model.js';
import jwt from 'jsonwebtoken';

export default class UserController{
    signUp(req, res){
        const { name, email, password} = req.body;
        const u = UserModel.signUp(name,email,password);
        res.status(201).send(u);
    } 

    signIn(req, res){
        const e = req.body.email;
        const p = req.body.password;

        const secretKey =  '760e7516ef848e2bfaf55f8f8710de41442a80b7d860041a610c45fd71308645';

        const r = UserModel.signIn(e,p);
        // console.log("R ="+r);
        if (r == 'green')
        {
            const uI = UserModel.getUserId(e);
            const token = jwt.sign(
                {
                    userId: uI,
                    email: e,
                },
                secretKey,
                {
                    expiresIn: '1h'
                }

            );

            res.status(200).send(token);
        }
        else if (r == 'red')
        {
            res.status(401).send('Incorrect Password');
        }
        else{
            res.status(400).send('The email/account does not exist');
        }
    }
   
}