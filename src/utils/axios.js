import Axios from 'axios'
import {message} from "antd";
import history from './history'
import cookie from 'react-cookies'
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
       // const refresh_token = window.localStorage.getItem('refresh_token');
       // const status = window.localStorage.getItem('status')



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

            let difference = cookie.load('difference')
            let exp = cookie.load('exp')
            let now = Date.parse(new Date())/1000
            //console.log('refresh_token过期时间',new Date(parseInt(exp)*1000))
           // console.log('token剩余时间',difference,Date.parse(new Date())/1000)

               // console.log('result',parseInt(exp)-now)


            //刷新了token
            if(exp){
                if(parseInt(exp)-Date.parse(new Date())/1000<60){
                    let res = parseInt(exp)-Date.parse(new Date())/1000
                   // console.log('令牌即将过期，请先保存好内容，重新登录。')

                   // window.localStorage.removeItem('refresh_token');
                   // window.localStorage.removeItem('token');
                    history.replace('/result4011',{
                        res
                    })
                    window.location.reload()
                }else{
                    let flag = true;
                    if(flag) {
                        if (difference < 60) {
                            const refresh_token = window.localStorage.getItem('refresh_token');
                            Axios.post('/api/admins/refreshtoken', {}, {
                                headers: {
                                    'Authorization': 'Bearer ' + refresh_token
                                },
                            }).then(data => {
                                if (data.data.code === 100) {
                                } else {
                                    flag = false
                                  //  console.log('刷新的最新token 120s', data.data.token);

                                    window.localStorage.setItem('token', data.data.token)
                                }


                            })
                        }
                    }
                }

            }else{
                let flag = true;
                if(flag){
                    if(difference<1600){
                        const refresh_token = window.localStorage.getItem('refresh_token');
                        Axios.post('/api/admins/refreshtoken',{},{
                            headers:{
                                'Authorization':'Bearer '+refresh_token
                            },
                        }).then(data=>{
                            if(data.data.code === 100){
                            }else{
                                flag = false
                               // console.log('刷新的最新token 120s',data.data.token);

                                window.localStorage.setItem('token',data.data.token)
                            }


                        })
                    }
            }

                }



            if(response.data.token && response.data.token !== null){
                console.log('jinlaile....')
                window.localStorage.setItem('token', response.data.token);
                window.localStorage.setItem('refresh_token', response.data.refresh_token);
                //判断refresh_token过期，提示
                //const exp = document.cookie('exp')
                //console.log('cookies-exp:',exp)

            }
            return Promise.resolve(response)
        }else{
            return Promise.reject(response)
        }
    },
    error=>{
       // console.log(error)
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
                   // console.log('404')
                    setTimeout(()=>{
                        history.replace('/result404')
                        history.go(0)
                    },1000);

                break;
                //401 没有权限
                case 401:

                        // const refresh_token = window.localStorage.getItem('refresh_token');
                        // Axios.post('/api/users/refreshtoken',{},{
                        //     headers:{
                        //         'Authorization':'Bearer '+refresh_token
                        //     },
                        // }).then(data=>{
                        //        if(data.data.code === 100){
                        //
                        //
                        //
                        //     }else{
                        //            console.log('401 refresh_token',data.data);
                        //            window.location.reload();
                        //
                        //         window.localStorage.setItem('token',data.data.token)
                        //     }
                        //
                        //
                        // }).catch((error=>{
                        //     console.log(error);
                        //     history.replace('/result401');
                        //     window.location.reload();
                        //
                        //     window.localStorage.removeItem('token');
                        //     window.localStorage.removeItem('refresh_token');
                        //     cookie.remove('exp')
                        //    // window.localStorage.removeItem('user');
                        //
                        //     //
                        //    //
                        // }))



                    cookie.remove('exp')
                    cookie.remove('difference')
                    window.localStorage.removeItem('refresh_token');
                    window.localStorage.removeItem('token');
                    history.replace('/result401');
                    window.location.reload();

                    //window.localStorage.setItem('status',401)
                    //message.error('您暂时没有权限。')

                    // setTimeout(()=>{
                    //
                    //     //history.go(-1)
                    //     window.location.reload()
                    //
                    // },1000);

                    break;


                    //504 网络错误
                case 504:
                   // console.log('jinlaile')
                    message.error('网络错误。')
                    setTimeout(()=>{
                        window.localStorage.removeItem('refresh_token');
                         window.localStorage.removeItem('token');
                        history.replace('/result504')
                       window.location.reload()
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

