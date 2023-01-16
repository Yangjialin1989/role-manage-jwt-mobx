import {makeAutoObservable} from "mobx";

import service from './../service'
class UserStore{
    //可观察的属性 observable,相当于全局变量，刷新就没有了，因此computed
    //计算属性 computed,action
    constructor() {
        makeAutoObservable(this)
    }

    userInfo = window.localStorage.getItem('user')?JSON.parse(window.localStorage.getItem('user')):[];
    userList = sessionStorage.getItem('userList')?JSON.stringify(sessionStorage.getItem('userList')):{};
    //userList = sessionStorage.getItem('userList')?sessionStorage.getItem('userList'):[];


    //获取
    get user(){
        if(sessionStorage.getItem('user')){
            return JSON.parse(sessionStorage.getItem('user'));
        }
        return {};
    }
    //修改
    set user(data){
        sessionStorage.setItem('user',JSON.stringify(data))
    }
    //获取
    get userlist(){
        if(sessionStorage.getItem('userlist')){
            return sessionStorage.getItem('userlist');
        }
        return {};
    }
    get permissionlist(){
        if(sessionStorage.getItem('user')){
            return JSON.parse(sessionStorage.getItem('user'));
        }
        return {};
    }
    //修改
    set userlist(data){
        sessionStorage.setItem('userlist',JSON.stringify(data))
    }

    get token(){
        if(window.localStorage.getItem('token')){
            return window.localStorage.getItem('token');
        }
        return "";
    }
    set token(value){
        window.localStorage.setItem('token',value)
    }

    login=(userInput)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_Login(userInput).then((data)=>{
                console.log('store - login',data)
                this.token = data.token;
                //this.user = data.data;
                this.userInfo = data.data;
               window.localStorage.setItem('user',JSON.stringify(data.data));
                //返回data，用于前台判断
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    userrefreshtoken=(userInput)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_Userrefreshtoken(userInput).then((data)=>{
                console.log('store - userrefreshtoken',data)
                this.token = data.token;

               //window.localStorage.setItem('token',data.data);
                //返回data，用于前台判断
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    useravatar=(userInput)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_Useravatar(userInput).then((data)=>{
                console.log('store - useravatar',data)
               //window.localStorage.setItem('token',data.data);
                //返回data，用于前台判断
                window.localStorage.setItem('avatar',data.data);
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    userlist1=(limit)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_Userlist(limit).then((data)=>{
                //console.log('store - userlist',data.data)
                //this.token = data.token;
                //this.user = data.data;
                //this.userList = data.data;
                sessionStorage.setItem('userList',JSON.stringify(data.data));
                //sessionStorage.setItem('userList',data.data);
                //返回data，用于前台判断
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    userplist=(limit)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_Userplist(limit).then((data)=>{
                //console.log('store - userlist',data.data)
                //this.token = data.token;
                //this.user = data.data;
                //this.userList = data.data;
                sessionStorage.setItem('userplist',JSON.stringify(data.data));
                //sessionStorage.setItem('userList',data.data);
                //返回data，用于前台判断
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    userdelete=(params)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_Userdelete(params).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    userupdate=(params)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_Userupdate(params).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    usersearch=(params)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_Usersearch(params).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }

}
//属性
//token
//user信息
//isLogin
//

//方法
//login action (发起请求）



export default UserStore

