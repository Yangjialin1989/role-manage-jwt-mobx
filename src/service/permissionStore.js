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