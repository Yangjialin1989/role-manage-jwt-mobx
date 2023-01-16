import React from 'react'
import {Menu} from "antd";

import * as IconNode from '@ant-design/icons';
import {Link} from 'react-router-dom'
import {useSelector} from "react-mobx";






function LeftMenu(props){
    //动态生成导航菜单
    //1.拿到mobx走过来的user存储的menuInfo
    //props.user.user.menuInfo
     const {user} = useSelector(state => state.userReducer)
    //2.menuInfo数组生成对应菜单要求的数组
    function bindMenu(menuList){
        let arr = []

        //[...bindMenu(item.menuChilds)]
        //解构，创建新的数组，递归
        menuList.map((item)=>{
            const ICON = IconNode[item.menuImgClass]

            //1.有子菜单
            if(item.menuChilds && item.menuChilds.length > 0){
                arr.push(
                    {
                        key:item.menuId,
                        icon:<ICON/>,
                        label:item.menuName,
                        children:[...bindMenu(item.menuChilds)]
                    }
                )
            }else{
                arr.push(
                    {
                        key:item.menuId,
                        icon:<ICON/>,
                        label:<Link to={item.menuUrl}>{item.menuName}</Link>
                    }
                )
            }
        })
        console.log(arr)
        return arr
    }
    //const menuInfo = Object.keys(props.user.user).length > 0 ? props.user.user.menuInfo:[];

    return(
        <Menu

            theme="light"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={bindMenu(user.menuInfo?user.menuInfo:[])}
        />
    )
}
export default LeftMenu