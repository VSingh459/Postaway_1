import LikeModel from './like.model.js';
import PostModel from '../post/post.model.js';

export default class LikeController
{
    addo(req,res)
    {
        const userId = req.user.userId;
        const postId = Number(req.query.postId);

        const u = PostModel.userIdOfPost(postId);
        if (u.flag === 'green' && u.user === userId)
        {
            return res.status(400).json({error: 'User cannot like his/her own post'});
        }

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
           const aa = LikeModel.addLike(userId,postId);
           if (aa.flag === 'red')
           {
            return res.status(400).json({error: 'User has already liked this post earlier.'});
           }
           res.status(201).json({ message: "Like added successfully", totalLikes: aa.total, likesObject: aa.lo });
        }
    }

    delo(req,res)
    {
        const userId = req.user.userId;
        const likeId = Number(req.query.likeId);
        const d = LikeModel.deleteLike(userId, likeId);
        if (d.flag === 'red')
        {
            return res.status(400).json({error: 'The like does not exist'});
        }
        else if (d.flag === 'yellow')
        {
            return res.status(400).json({error: `User cannot delete somebody else's like`});
        }
        else{
            res.status(200).json({ message: 'Delete successfully deleted', TotalLikes: d.t });
        }
    }

    totalLikesonPost(req, res)
    {
        const userId = req.user.userId;
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
            const tot = LikeModel.getTotalLikesByPostId(postId);
            res.status(201).json({totalLikes: tot});
        }

    }

}