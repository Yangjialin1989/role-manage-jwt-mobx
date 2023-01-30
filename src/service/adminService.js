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
export function Admin_valid(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.adminApi.ADMIN_VALID,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//管理员注册
export function Admin_register(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.adminApi.ADMIN_REGISTER,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//管理员列表
export function Admin_list(limit){
    return new Promise((resolve, reject)=>{
        axios.post(api.adminApi.ADMIN_LIST,limit).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//搜索管理员
export function Admin_search(limit){
    return new Promise((resolve, reject)=>{
        axios.post(api.adminApi.ADMIN_SEARCH,limit).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//删除管理员
export function Admin_delete(limit){
    return new Promise((resolve, reject)=>{
        axios.post(api.adminApi.ADMIN_DELETE,limit).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//更新管理员
export function Admin_update(limit){
    return new Promise((resolve, reject)=>{
        axios.post(api.adminApi.ADMIN_UPDATE,limit).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//修改头像
export function Admin_avatar(limit){
    return new Promise((resolve, reject)=>{
        axios.post(api.adminApi.ADMIN_AVATAR,limit).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//刷新access_token
export function Admin_refresh(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.adminApi.ADMIN_REFRESH,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}


