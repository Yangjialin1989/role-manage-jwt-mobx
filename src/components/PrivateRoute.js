// 用于创建路由(可以根据数据，生成动态的路由)
import {useRoutes,Navigate} from 'react-router-dom'
import {useEffect} from 'react'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Result500 from "./Result/Result500";
// react 动态加载组件 @loadable/component
import loadable from '@loadable/component'
import {observer,inject} from 'mobx-react'
import Result403 from "./Result/Result403";
import Result404 from "./Result/Result404";
import Result401 from "./Result/Result401";
import Result4011 from "./Result/Result4011";
import Result504 from "./Result/Result504";
//import {useEffect} from "@types/react";
const PrivateRoute = (props)=>{
    useEffect(() => {
        // let arr = [...bindRouter1(props.admin.adminInfo.menuInfo1 ? props.admin.adminInfo.menuInfo1 :[])]
        // let arr1 = [...bindRouter(props.admin.adminInfo.menuInfo ? props.admin.adminInfo.menuInfo:[])]
        // console.log('arr',arr)
        // console.log('arr1',arr1)
    }, []);
   function bindRouter(list){
       //console.log('Routelist',list)
    let arr = [];
      list.map((item)=>{

        const ComponentNode = loadable(()=>{
            return import("./"+item.componentPath)
        })
          if(item.menuChilds && item.menuChilds.length>0){
              console.log(item)
            if(item.isContainChildren===true){
                arr.push({
                    path:item.pathRoute,
                    //element:<ComponentNode/>,
                    children:[...bindRouter(item.menuChilds)]
                })
            }else{
                arr.push({
                    path:item.pathRoute,
                    element:<ComponentNode/>
                    // children:[...bindRouter(item.menuChilds)]
                })
            }
            return arr
           
          }else{
            //console.log(item)
            arr.push({
                path:item.pathRoute,
                element:<ComponentNode/>
            })
              //console.log(arr)
          }
      })
      console.log('router',arr)
      return arr;
   }function
    bindRouter1(list){
      // console.log('list',list)
    let arr = [];
      list.map((item)=>{
        //  console.log(item.componentPath)
        const ComponentNode = loadable(()=>{
            return import("./"+item.componentPath)
        })
          if(item.menuChilds && item.menuChilds.length>0){
            if(item.isContainChildren){
                arr.push({
                    path:item.pathRoute,
                    element:<ComponentNode/>,
                    children:[...bindRouter(item.menuChilds)]
                })
            }else{
                arr.push({
                    path:item.pathRoute,
                    element:<ComponentNode/>,
                    //children:[...bindRouter(item.menuChilds)]
                })
            }
            return arr

          }else{

            arr.push({
                path:item.pathRoute,
                element:<ComponentNode/>
            })
          }
      })
       console.log('router1',arr)
      return arr;
   }

    //console.log('localstorage menuInfos',JSON.parse(menuInfos))
  // const menuInfo = props.user.userInfo.menuInfo ?props.user.userInfo.menuInfo :[];
  // const menuInfo = props.admin.adminInfo.menuInfo1 ?props.admin.adminInfo.menuInfo1 :[];
   const menuInfo = props.admin.adminInfo.menuInfo ?props.admin.adminInfo.menuInfo :[];
  // const menuInfo = menuInfos? menuInfos:[];

    // if(props.user.userInfo.menuInfo === undefined){
    //     return
    // }
    return useRoutes([
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/index",
            element:<Home />,
            children:[...bindRouter(menuInfo)]
        },
        {
            path:"/result500",
            element:<Result500/>
        },
        {
            path:"/result403",
            element:<Result403/>
        },
        {
            path:"/result404",
            element:<Result404/>
        },
        {
            path:"/result401",
            element:<Result401/>
        },
        {
            path:"/result4011",
            element:<Result4011/>
        },
        {
            path:"/result504",
            element:<Result504/>
        },
        //访问其余路径直接跳转到首页
        {
            path:'*',
            element:<Navigate to={'/login'}/>,
            key:'1000000'

        }
    ])
}

export default inject('user','admin')(observer(PrivateRoute));