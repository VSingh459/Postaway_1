
var posts = [];

export default class PostModel{
    constructor(userId,caption,imageUrl){
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
        this.id = posts.length+1;
    }
     static addPost(userId, caption, imageUrl)
     {
        const p = new PostModel(userId, caption, imageUrl);
        posts.push(p);
        return p;
     }

     static getAll(){
        return posts;
     }

     static updatePost(postId, userId, caption, imageUrl) {
        const obj = { flag: 'red', p: null };
    
        // Find the post by id
        let post = null;

        for (let i = 0; i < posts.length; i++) {
        
            if (posts[i] !== null) {
        
                if (posts[i].id === postId) {
                    post = posts[i];
                    break; 
                }
            }
            }
        
        if (post.userId !== userId) {
            return obj;
        }
    
        if (caption) {
            post.caption = caption;
        }
        if (imageUrl) {
            post.imageUrl = imageUrl;
        }
    
        obj.flag = 'green';
        obj.p = post;
        return obj;
    }
    
    
     static getAllPostsByUserId(userId){
        const a = [];
        for (let i=0;i<posts.length;i++)
        {
            if (posts[i] != null && userId === posts[i].userId)
            {
                a.push(posts[i]);
            }
        }
        return a;
     }


     static getPostByPostId(postId, userId) {
        // Find the post by its id
        const p = posts.find(post => post !== null && post.id === postId);
    
        // Check if the post exists and belongs to the user
        if (p && p.userId === userId) {
            return p;
        }
    
        // Return "red" if not found or the user doesn't own the post
        return "red";
    }
    

    static deletePost(id, userId) {
        const index = id - 1; 
        const obj = { flag: 'green', a: posts };
    
        if (index >= 0 && index < posts.length) {
            const post = posts[index];
            
            if (post !== null && post.userId === userId) {
                posts[index] = null; 
            } else {
                obj.flag = 'red'; 
            }
        } else {
            obj.flag = 'red'; // Invalid index
        }
    
        return obj;
    }
    

    static isPostIdValid(postId)
    {
        let flag = 'green';
        if (postId <= 0 || postId > posts.length)
        {
            flag = 'red';
            return flag;
        }
        else if (posts[postId-1] === null)
        {
            flag = 'yellow';
            return flag;
        }
        else{
            return flag;
        }
    }

    static userIdOfPost(postId)
    {
        let obj = {
            flag: 'green',
            user: null
        }

        if (postId <= 0 || postId > posts.length)
        {
            obj.flag = 'red';
            return obj;
        }
        else if (posts[postId-1] === null)
        {
            obj.flag = 'yellow';
            return obj;
        }
        else{
            obj.user = posts[postId-1].userId;
            return obj;
        }

    }
}


PostModel.addPost(1, 'Well Done Boy', 'https://en.wikipedia.org/wiki/Boy_(2010_film)');