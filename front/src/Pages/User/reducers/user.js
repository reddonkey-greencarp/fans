class Account {
    constructor(name,password,age=18,gender='male',city,role='1',idols=[],avatar=null) {
        this.name = name;
        this.password = password;
        this.age = age;
        this.gender = gender;
        this.city = city;
        this.role = role;
        this.idols = idols;
        this.avatar = avatars;
    }
}

const Accounts = [
    {
        name: 'admin',
        age: 20,
        gender: 'male',
        city: 'Wuhan',
        role:2, // 0 for unregistered, 1 for normal users, 2 for administrators;
        idols: ['Cai Xukun','Jiang Zemin']
        avatar:null,
    },
    {
        name: 'watermelon',
        age: 20,
        gender: 'male',
        city: 'Wuhan',
        avatar:null,
        role:1, // 0 for unregistered, 1 for normal users, 2 for administrators;
        idols: ['Yang Chaoyue']
    },
]

const user = (state={},action)=>{
    let res;
    try {
        switch(action.type){
            case 'REGISTER':
                res = Accounts.filter(account=>
                    account.name !== state.name
                );
                if (!res.length) {
                    Accounts.push(state)
                }
                return Object.assign({},state);
            case 'LOGIN':
                res = Accounts.filter(account=>
                    account.name === state.name &&
                    account.password === state.password
                );
                if (res.length){
                    return Object.assign({},state,res[0]);
                } else {
                    return null;
                }
            default:
                return state;
        }
    } catch (e) {
        console.log(e)
    }

};
export default user;