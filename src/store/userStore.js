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
    //1.login
    login=(userInput)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_Login(userInput).then((data)=>{
               // console.log('store - login',data)
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
    //2.list
    list1=(limit)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_list(limit).then((data)=>{
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
    //3.delete
    delete=(params)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_delete(params).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    //4.update
    update=(params)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_update(params).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    //5.search
    search=(params)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_search(params).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    //7.avatar
    avatar=(userInput)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_avatar(userInput).then((data)=>{
                //console.log('store - useravatar',data)
               //window.localStorage.setItem('token',data.data);
                //返回data，用于前台判断
                window.localStorage.setItem('avatar',data.data);
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    //8.valid
    valid=(userInput)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_valid(userInput).then((data)=>{
                console.log('store - uservalid',data)
                //window.localStorage.setItem('token',data.data);
                //返回data，用于前台判断
                //window.localStorage.setItem('avatar',data.data);
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }

    //9.register
    register=(userInput)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_register(userInput).then((data)=>{
                //console.log('store - userregister',data)
               //window.localStorage.setItem('token',data.data);
                //返回data，用于前台判断
                //window.localStorage.setItem('avatar',data.data);
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

