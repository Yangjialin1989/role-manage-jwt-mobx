import axios from "../utils/axios";
import api from './../api'

//管理员登录
export function Admin_Login({name,password}){
    return new Promise((resolve, reject)=>{
        axios.post(api.adminApi.ADMIN_LOGIN,{name,password}).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//管理员注册的时候管理员名验证
export function Admin_Adminvalid(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.adminApi.ADMIN_ADMINVALID,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//管理员注册
export function Admin_Adminregister(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.adminApi.ADMIN_ADMINREGISTER,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//管理员列表
export function Admin_Adminlist(limit){
    return new Promise((resolve, reject)=>{
        axios.post(api.adminApi.ADMIN_ADMINLIST,limit).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//搜索管理员
export function Admin_Adminsearch(limit){
    return new Promise((resolve, reject)=>{
        axios.post(api.adminApi.ADMIN_ADMINSEARCH,limit).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//删除管理员
export function Admin_Admindelete(limit){
    return new Promise((resolve, reject)=>{
        axios.post(api.adminApi.ADMIN_ADMINDELETE,limit).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//更新管理员
export function Admin_Adminupdate(limit){
    return new Promise((resolve, reject)=>{
        axios.post(api.adminApi.ADMIN_ADMINUPDATE,limit).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}

