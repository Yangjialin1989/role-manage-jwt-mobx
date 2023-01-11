import Axios from 'axios'
import {message} from "antd";
import history from './history'
const axios = Axios.create({
    //baseURL:'/dev-api',
    baseURL:'/api',
    timeout:20000
});

//拦截器Axios发送的所有请求，通过dispatch修改isLoading为true
axios.interceptors.request.use(
    request=>{

        //需要把token添加到header
        const token = window.localStorage.getItem('token');
        if(token){
            //request.headers['Authorization'] = `Bearer ${token}`
            request.headers = {
               // 'Content-Type':'application/json',
                //'Authorization':"Bearer "+token
                'Authorization':'Bearer '+token,
                //'Access-Control-Allow-Origin':'*'
            }

        }



        return request;
    },
    err=>{
        return Promise.reject(err);
    }
)
//拦截器Axios发送的所有响应，通过dispatch修改isLoading为false
// axios.interceptors.response.use((config=>{
//     console.log(config)
//     //需要将token存起来。
//     return config
// }))
axios.interceptors.response.use(
    response=>{
        if(response.status === 200){
            if(response.data.token){
                window.localStorage.setItem('token', response.data.token);
            }
            return Promise.resolve(response)
        }else{
            return Promise.reject(response)
        }
    },
    error=>{
        if(error.response.status){
            switch (error.response.status){
                case 500:
                    setTimeout(()=>{
                        history.replace('/result500')
                        history.go(0)
                    },1000);

                break;
                //403token过期
                case 403:

                    setTimeout(()=>{
                        history.replace('/result403')
                        history.go(0)
                    },1000);

                break;
                //404网络请求不存在
                case 404:

                    setTimeout(()=>{
                        history.replace('/result404')
                        history.go(0)
                    },1000);

                break;
                //401 没有权限
                case 401:
                    message.error('您暂时没有权限。')
                    setTimeout(()=>{

                        //history.go(-1)
                        window.location.reload()
                        //history.back()
                    },1000);

                    break;

                default:

                    message.error(error.response.data.message)


            }
            return Promise.reject(error.response)
        }
    }


)
export default axios

