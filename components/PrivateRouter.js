//私有路由，用于创建路由，根据数据生成动态路由
import {useRoutes} from 'react-router-dom'
//react 动态加载组件
import loadable from '@loadable/component'



//用户登录前
//动态生成路由

// / 默认是登录
import Login from '../../pages/Login'
import Home from '../pages/Home'
import {useSelector} from 'react-mobx'
import Result504 from "../src/components/Result/Result504";
const PrivateRouter = (props)=>{
    const {user} = useSelector(state => state.userReducer)
    //递归

    const menuInfo = user.menuInfo?user.menuInfo:[]
    function bindRouter(menuInfo){
        let arr = [];
        menuInfo.map((item)=>{
            const ComponentNode = loadable(()=>{
            return import('./'+item.componentPath)
        })
            if(item.menuChilds && item.menuChilds.length > 0){
                if(item.isContainChildren){
                    arr.push({
                        path:item.pathRoute,
                        element:<ComponentNode/>,
                        children:[...bindRouter(item.menuChilds)]
                    })
                }else{
                    arr.push({
                        path:item.pathRoute,
                        //path:item.menuUrl,
                        children:[...bindRouter(item.menuChilds)]
                    })
                }

            }else{

                arr.push({
                    path:item.pathRoute,
                    //path:item.menuUrl,
                    element:<ComponentNode/>
                })
            }

        })
        console.log('PrivateRouter',arr)

        return arr;
    }
    return useRoutes([
        {
            path:'/',
            element:<Login/>
        },
        {
            path:'/index',
            element:<Home/>,
            children:[...bindRouter(menuInfo)]
        },
        {
            path:'/result504',
            element:<Result504/>
        }

    ])
}

export default PrivateRouter


