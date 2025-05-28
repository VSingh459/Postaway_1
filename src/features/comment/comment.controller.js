import  CommentModel from './comment.model.js';
import PostModel from '../post/post.model.js';

export default class CommentController
{

    adder(req, res)
    {
        const userId = req.user.userId;
        const postId = Number(req.query.postId);
        const comment = req.body.comment;
      
        const f = PostModel.isPostIdValid(postId);
        
        if (f == 'red')
        {
            return res.status(400).json({error: 'Post does not exist'});
        }
        else if (f == 'yellow')
        {
            return res.status(400).json({error: 'PostId is null becuase maybe post was deleted'});
        }
        else{
            const commer= CommentModel.addComment(userId,postId,comment);
            res.status(201).send(commer);
        }
    }

    getAllComments(req,res)
    {
        const postId = Number(req.query.postId);
        const f = PostModel.isPostIdValid(postId);
        if (f == 'red')
            {
                return res.status(400).json({error: 'Post does not exist'});
            }
            else if (f == 'yellow')
            {
                return res.status(400).json({error: 'PostId is null becuase maybe post was deleted'});
            }
            else{
                const aller = CommentModel.getAllCommentsBypostId(postId);
                res.status(201).send(aller);
            }
    }

    deleteComment(req, res)
    {
        const userId = req.user.userId;
        const commentId = Number(req.query.commentId);
        const deler = CommentModel.delComment(userId,commentId);
        if (deler.flag === 'red')
        {
            return res.status(400).json({error: 'The comment does not exist'});
        }
        else if (deler.flag === 'darkred')
        {
            return res.status(403).json({ error: 'You are not authorized to delete this comment' });
        }
        
        res.status(200).send(deler.arr);
    }

}