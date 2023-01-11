import axios from "../utils/axios";
import api from './../api'
export function Upload_Imgupload(params){
    return new Promise((resolve, reject)=>{
        axios.post(api.uploadApi.IMG_UPLOAD,params).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}
