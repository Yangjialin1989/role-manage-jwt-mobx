import {makeAutoObservable} from "mobx";

import service from './../service'
class AdminStore{
    //可观察的属性 observable,相当于全局变量，刷新就没有了，因此computed
    //计算属性 computed,action
    constructor() {
        makeAutoObservable(this)
    }

    adminInfo = window.localStorage.getItem('admin')?JSON.parse(window.localStorage.getItem('admin')):[];
    adminList = sessionStorage.getItem('adminList')?JSON.stringify(sessionStorage.getItem('adminList')):{};
    //userList = sessionStorage.getItem('userList')?sessionStorage.getItem('userList'):[];


    //获取
    get admin(){
        if(sessionStorage.getItem('admin')){
            return JSON.parse(sessionStorage.getItem('admin'));
        }
        return {};
    }
    //修改
    set admin(data){
        sessionStorage.setItem('admin',JSON.stringify(data))
    }
    //获取
    get adminList(){
        if(sessionStorage.getItem('adminlist')){
            return sessionStorage.getItem('adminlist');
        }
        return {};
    }
    get permissionlist(){
        if(sessionStorage.getItem('admin')){
            return JSON.parse(sessionStorage.getItem('admin'));
        }
        return {};
    }
    //修改
    set adminList(data){
        sessionStorage.setItem('adminlist',JSON.stringify(data))
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
    //登录
    login=(adminInput)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.adminService.Admin_Login(adminInput).then((data)=>{
              //console.log('store - login',data)
                if(data.code===100){
                   // message.error(data.msg)
                }else{
                    this.token = data.token;
                    //this.user = data.data;
                    this.adminInfo = data.data;
                    window.localStorage.setItem('admin',JSON.stringify(data.data));
                }

                //返回data，用于前台判断
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    //名称验证
    valid=(adminInput)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.adminService.Admin_valid(adminInput).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    //注册
    register=(adminInput)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.adminService.Admin_register(adminInput).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    //获取列表
    list=(limit)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.adminService.Admin_list(limit).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    //搜索管理员
    search=(admin)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.adminService.Admin_search(admin).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    //搜索管理员
    delete=(admin)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.adminService.Admin_delete(admin).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    //搜索管理员
    update=(admin)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.adminService.Admin_update(admin).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    //搜索管理员
    avatar=(imgSrc)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.adminService.Admin_avatar(imgSrc).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }











        refresh=(userInput)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.adminService.Admin_refresh(userInput).then((data)=>{
                //console.log('store - userrefreshtoken',data)
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
    userregister=(userInput)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_Userregister(userInput).then((data)=>{
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
    userpf=(userInput)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_Userpf(userInput).then((data)=>{
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

    userpd=(userInput)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_Userpd(userInput).then((data)=>{
                //console.log('store - userps',data)
               //window.localStorage.setItem('token',data.data);
                //返回data，用于前台判断
                //window.localStorage.setItem('avatar',data.data);
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    userpu=(userInput)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_Userpu(userInput).then((data)=>{
                //console.log('store - userps',data)
               //window.localStorage.setItem('token',data.data);
                //返回data，用于前台判断
                //window.localStorage.setItem('avatar',data.data);
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    userpl=(userInput)=>{
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve,reject )=>{
            //1.发起axios请求
            service.userService.User_Userpl(userInput).then((data)=>{
                console.log('store - userpl',data)
               //window.localStorage.setItem('token',data.data);
                //返回data，用于前台判断
                //window.localStorage.setItem('avatar',data.data);
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



export default AdminStore

