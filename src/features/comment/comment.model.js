import CommentController from './comment.controller.js';

var comments = [];

export default class CommentModel{
    constructor(userId,postId,content)
    {
        this.id = comments.length+1;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    static addComment(userId,postId,content)
    {
        const c = new CommentModel(userId,postId,content);
        comments.push(c);
        return c;
    }

    static getAllCommentsBypostId(postId) {
        const ac = [];
        for (let i = 0; i < comments.length; i++) {
            if (comments[i] !== null && comments[i].postId === postId) {
                ac.push(comments[i]);
            }
        }
        return ac;
    }
    

    static delComment(userId, id)
    {
        let obj = {
            flag: 'green',
            arr: null
        }
        const index = id-1;
        if (index <=0 && index >= comments.length)
        {
            obj.flag = 'red';
            return obj;
        }
        
        if (comments[index] !== null && comments[index].userId !== userId)
        {
            obj.flag = 'darkred';
        }
        else if (comments[index] !== null && comments[index].userId === userId)
        {
            comments[index] = null;
            obj.arr = comments;
        }

        return obj;

    }

    


}