import axios from "../utils/axios";
import api from './../api'

//1.角色保存
export function Role_save(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.roleApi.ROLE_SAVE,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//2.角色查询
export function Role_search(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.roleApi.ROLE_SEARCH,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//3.角色列表
export function Role_list(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.roleApi.ROLE_LIST,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//4.角色更新
export function Role_update(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.roleApi.ROLE_UPDATE,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//5.角色更新
export function Role_delete(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.roleApi.ROLE_DELETE,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}


