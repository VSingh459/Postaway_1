import PostModel from './post.model.js';
import jwt from 'jsonwebtoken';

export default class PostController{

    addPost(req, res)
    {
        const userId = req.user.userId;
        const caption = req.body.caption;
        const imageUrl = req.file.filename;
        const pp = PostModel.addPost(userId,caption,imageUrl);
        res.status(201).send(pp);
    }

    getPostsByUserId(req, res)
    {
        const uu = req.user.userId;
        const allP = PostModel.getAllPostsByUserId(uu);
        res.status(201).send(allP);
    }

     getPostById(req, res)
     {
        const pi = Number(req.params.postId);
        const userId = req.user.userId;
        const post = PostModel.getPostByPostId(pi, userId);
        if (post != 'red')
        {
            res.status(200).send(post);
        }
        else{
            return res.status(404).json({ error: 'Post not found' });
        }
     }

     updatePost(req,res)
     {
        const postId = Number(req.query.postId);
        const userId = req.user.userId;

        if (!postId) {
            return res.status(400).json({ error: 'PostId is required' }); // Validate presence of postId
        }

        const caption = req.body.caption;
        const imageUrl = req.file.filename;
        const postObj = PostModel.updatePost(postId,userId,caption,imageUrl);
        if (postObj.flag == 'red')
        {
            return res.status(400).json({error: 'PostId is invalid or UserId does not match with post'});
        }
        else{
            res.status(201).send(postObj.p);
        }
     }

     delPost(req, res)
     {
        const userId = req.user.userId;
        const postId = Number(req.query.postId);
        const f = PostModel.deletePost(postId, userId);
        if (f.flag == 'red')
        {
            return res.status(400).json({error: 'postId is invalid or userId did not match'});
        }
        else{
            res.status(200).send(f.a);
        }
     }

}