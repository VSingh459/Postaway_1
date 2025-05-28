
let likes = [];
let counter = 0;


export default class LikeModel
{
    constructor(userId,postId)
    {
        this.id = likes.length+1;
        this.userId = userId;
        this.postId = postId;
    }

    static addLike(userId, postId)
    {
        const obj = {
            total: null,
            lo: null,
            flag: 'green'
        };
       
        for (let i=0;i<likes.length;i++)
        {
            if (likes[i] != null && userId === likes[i].userId && postId === likes[i].postId)
            {
                obj.flag = 'red';
                return obj;
            }
        }
        counter++;
        obj.total = counter;
        obj.lo = new LikeModel(userId,postId);
        likes.push(obj.lo);
        return obj;
    }

    static deleteLike(userId, likeId) {
        let obj = {
            flag: 'green',
            t: null,
        };
    
        if (likeId <= 0 || likeId > likes.length) {
            obj.flag = 'red'; // Invalid likeId
            return obj;
        }
    
        const like = likes[likeId - 1]; 

        if (like === null || like.userId !== userId) {
            obj.flag = 'yellow'; 
            return obj;
        }
    
        likes[likeId - 1] = null;
        counter--; 
        obj.t = counter; 
        return obj;
    }

    static getTotalLikesByPostId(postId) {
        // Filter non-null likes and count those matching the postId
        return likes.filter(like => like !== null && like.postId === postId).length;
    }
}