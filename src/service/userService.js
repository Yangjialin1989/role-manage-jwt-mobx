import axios from "../utils/axios";
import api from './../api'

//1.login
export function User_Login({name,password}){
    return new Promise((resolve, reject)=>{
        axios.post(api.userApi.USER_LOGIN,{name,password}).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}



//2.用户列表
export function User_list(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.userApi.USER_LIST,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//3.删除某一用户
export function User_delete(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.userApi.USER_DELERE,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//4.更新已有的用户
export function User_update(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.userApi.USER_UPDATE,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//5.搜索用户
export function User_search(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.userApi.USER_SEARCH,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}


//7获取用户头像
export function User_avatar(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.userApi.USER_AVATAR,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}

//8.注册的时候用户名验证
export function User_valid(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.userApi.USER_VALID,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}

//9注册户名
export function User_register(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.userApi.USER_REGISTER,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}


//刷新access_token
export function User_Userlist(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.userApi.USER_USERLIST,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//获取用户权限表单
export function User_Userplist(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.userApi.USER_USERPLIST,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
