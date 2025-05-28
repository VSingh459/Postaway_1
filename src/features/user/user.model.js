
var users = [];

export default class UserModel{
    constructor(name,email,password)
    {
        this.name = name;
        this.email= email;
        this.password = password;
        this.id = users.length+1;
    }

    static signUp(name, email, password)
    {
        const u = new UserModel(name,email,password);
        users.push(u);
        return u;
    }

    static getAll(){
        return users;
    }

    static signIn(email,password)
    {
        for (let i=0;i<users.length;i++)
        {
            if (users[i].email == email && users[i].password == password)
            {
                return "green";
            }
            else if (users[i].email == email && users[i].password != password)
            {
                return "red";
            }
        }

        return 'yellow';
    }

    static getUserId(email)
    {
        for (let i=0;i<users.length;i++)
        {
            if (users[i].email == email)
            {
                return i+1;
            }
        }
    }


}

UserModel.signUp('Thomas Smith', 'thoS@yahoo.com', 'ths123');

