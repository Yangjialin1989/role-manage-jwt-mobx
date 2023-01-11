import axios from "../utils/axios";
import api from './../api'
export function User_Login({name,password}){
    return new Promise((resolve, reject)=>{
        axios.post(api.userApi.USER_LOGIN,{name,password}).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//获取用户列表
export function User_Userlist(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.userApi.USER_USERLIST,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//删除某一用户
export function User_Userdelete(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.userApi.USER_USERDELERE,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//更新已有的用户
export function User_Userupdate(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.userApi.USER_USERUPDATE,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//搜索用户
export function User_Usersearch(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.userApi.USER_USERSEARCH,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}