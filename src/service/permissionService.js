import axios from "../utils/axios";
import api from './../api'
//保存
export function Permission_save(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.permissionApi.PERMISSION_SAVE,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//查询多个
export function Permission_findmany(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.permissionApi.PERMISSION_FINDMANY,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//获取列表
export function Permission_list(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.permissionApi.PERMISSION_LIST,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//查询权限
export function Permission_search(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.permissionApi.PERMISSION_SEARCH,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//删除权限
export function Permission_delete(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.permissionApi.PERMISSION_DELETE,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
//更新权限
export function Permission_update(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.permissionApi.PERMISSION_UPDATE,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}