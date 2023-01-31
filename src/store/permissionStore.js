import {makeAutoObservable} from "mobx";

import service from './../service'
class PermissionStore {
    //可观察的属性 observable,相当于全局变量，刷新就没有了，因此computed
    //计算属性 computed,action
    constructor() {
        makeAutoObservable(this)
    }

    save= (roleInput) => {
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve, reject) => {
            //1.发起axios请求
            service.permissionService.Permission_save(roleInput).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    }
    search= (roleInput) => {
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve, reject) => {
            //1.发起axios请求
            service.permissionService.Permission_search(roleInput).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    delete = (roleInput) => {
        return new Promise((resolve, reject) => {
            //1.发起axios请求
            service.permissionService.Permission_delete(roleInput).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    }
    update = (roleInput) => {
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve, reject) => {
            //1.发起axios请求
            service.permissionService.Permission_update(roleInput).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    }
    list = (roleInput) => {
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve, reject) => {
            //1.发起axios请求
            service.permissionService.Permission_list(roleInput).then((data) => {
               // console.log('store - permissionlist', data)
                //window.localStorage.setItem('token',data.data);
                //返回data，用于前台判断
                //window.localStorage.setItem('avatar',data.data);
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    }
    findmany = (roleInput) => {
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve, reject) => {
            //1.发起axios请求
            service.permissionService.Permission_findmany(roleInput).then((data) => {
               // console.log('store - permissionlist', data)
                //window.localStorage.setItem('token',data.data);
                //返回data，用于前台判断
                //window.localStorage.setItem('avatar',data.data);
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    }



}


export default PermissionStore

