import {makeAutoObservable} from "mobx";

import service from './../service'
class UploadStore {
    //可观察的属性 observable,相当于全局变量，刷新就没有了，因此computed
    //计算属性 computed,action
    constructor() {
        makeAutoObservable(this)
    }


    upload = (userInput) => {
        //只进行数据处理，不进行界面提示信息，返回Promise对象
        return new Promise((resolve, reject) => {
            //1.发起axios请求
            service.uploadService.Upload_Imgupload(userInput).then((data) => {
                console.log('store -upload', data)

                //this.user = data.data;

                //返回data，用于前台判断
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}


export default UploadStore

