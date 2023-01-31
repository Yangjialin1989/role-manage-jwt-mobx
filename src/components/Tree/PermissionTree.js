import { Tree } from 'antd';
import {inject,observer} from "mobx-react";
import React, { useState } from 'react';
//import {useEffect} from "@types/react";
import {useEffect} from "react";

const App = (props) => {
    function getPermissionList() {
        props.permission.list().then(data=>{
            //this.filterplist(data.data)
            let permissionList = []
            let permission = []
            let permission2 = []
            let permission3 = []
            let permission4 = []
            data.data.map((item)=>{
                if(item.isMenu !== 1){
                    permissionList.push(item)
                }
            })
            let child = []
            let child2 = []
            let child3 = []
            let child4 = []

            permissionList.map((item)=>{

                if(item.parentId === 11){
                    //console.log(item)
                    child.push({
                        title:item.title,
                        key:item.key
                    })
                }
                //console.log(child)
                if(item.parentId === 0 && item.id ===11){

                    permission.push({
                        title:item.title,
                        key:item.key,
                        children:child
                    })
                }
            })

            permissionList.map((item)=>{

                if(item.parentId === 22){
                    //console.log(item)
                    child2.push({
                        title:item.title,
                        key:item.key
                    })
                }
                //console.log(child)
                if(item.parentId === 0 && item.id ===22){

                    permission2.push({
                        title:item.title,
                        key:item.key,
                        children:child2
                    })
                }
            })
            permissionList.map((item)=>{

                if(item.parentId === 33){
                    //console.log(item)
                    child3.push({
                        title:item.title,
                        key:item.key
                    })
                }
                //console.log(child)
                if(item.parentId === 0 && item.id ===33){

                    permission3.push({
                        title:item.title,
                        key:item.key,
                        children:child3
                    })
                }
            })
            permissionList.map((item)=>{

                if(item.parentId === 44){
                    //console.log(item)
                    child4.push({
                        title:item.title,
                        key:item.key
                    })
                }
                //console.log(child)
                if(item.parentId === 0 && item.id ===44){

                    permission4.push({
                        title:item.title,
                        key:item.key,
                        children:child4
                    })
                }
            })
            let pl = [...permission,...permission2,...permission3,...permission4]
            //console.log('userplist',pl)
            setTreeData(pl)

        })
    }

    useEffect(() => {
        getPermissionList()
    }, []);
    const {getPermissions} = props;
    const [treeData,setTreeData]=useState([]);
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const onExpand = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };
    const onCheck = async (checkedKeysValue) => {
        let menuKey = []
        console.log('onCheck', checkedKeysValue);
        menuKey.push("0-0-4-0")
        // let c = menuKey[0].substring(4,5)
        // console.log(c)
        checkedKeysValue.map((item)=>{
            if(item.substring(4,5)==='1'){
                menuKey.push("0-0-4-5","0-0-4-6")
            }
        })
        checkedKeysValue.map((item)=>{
            if(item.substring(4,5)==='0'){
                menuKey.push("0-0-4-1","0-0-4-2")
            }
        })
        checkedKeysValue.map((item)=>{
            if(item.substring(4,5)==='2'){
                menuKey.push("0-0-4-3","0-0-4-4")
            }
        })
        checkedKeysValue.map((item)=>{
            if(item.substring(4,5)==='3'){
                menuKey.push("0-0-4-7","0-0-4-8")
            }
        })
        const menuInfoKey= Array.from(new Set(menuKey))
        let permissionInfoKey = checkedKeysValue;
       // console.log('menuKey',menuKey,result)
       // console.log('permissions',permissions)
        // console.log(props)
        let data = await props.permission.findmany(menuInfoKey)
        //console.log(data.res)
        let menuInfo = data.res;
        //filterMenu(menuInfo)
        let arrs = filterMenu(menuInfo)
        let arrs1 = filterMenu1(menuInfo)
        // //console.log(arrs1)
        let data1 = await props.permission.findmany(permissionInfoKey);
        // //console.log(data1)
        //
        let permissionList = data1.res;

        getPermissions([arrs,permissionList])

        setCheckedKeys(checkedKeysValue);
    };
    const filterMenu=(menuInfo)=>{

                //setData(data.data)
                let userList = []
                let roleList = []
                let permissionList = []
                let adminList = []
                let menuList = []

                menuInfo.map((item)=>{
                    if(item.isMenu === 1){
                        if(item.parentId === 2){
                            userList.push({
                                menuId:item.id,
                                menuName:item.title,
                                componentPath:item.path,
                                pathRoute: item.pathRoute,
                                menuImgClass: item.menuImgClass,
                                menuUrl:item.rule,
                                isContainChildren: false
                            });
                        }
                        if(item.parentId === 3){
                            roleList.push({
                                menuId:item.id,
                                menuName:item.title,
                                componentPath:item.path,
                                pathRoute: item.pathRoute,
                                menuImgClass: item.menuImgClass,
                                menuUrl:item.rule,
                                isContainChildren: false
                            });
                        }
                        if(item.parentId === 4){
                            permissionList.push({
                                menuId:item.id,
                                menuName:item.title,
                                componentPath:item.path,
                                pathRoute: item.pathRoute,
                                menuImgClass: item.menuImgClass,
                                menuUrl:item.rule,
                                isContainChildren: false
                            });
                        }
                        if(item.parentId === 5){
                            adminList.push({
                                menuId:item.id,
                                menuName:item.title,
                                componentPath:item.path,
                                pathRoute: item.pathRoute,
                                menuImgClass: item.menuImgClass,
                                menuUrl:item.rule,
                                isContainChildren: false
                            });
                        }

                        if(item.id === 2){
                            item.menuChilds = userList;
                            item.isContainChildren=true;
                        }
                        if(item.id === 3){
                            item.menuChilds = roleList;
                            item.isContainChildren=true;
                        }
                        if(item.id === 4){
                            item.menuChilds = permissionList;
                            item.isContainChildren=true;
                        }
                        if(item.id === 5){
                            item.menuChilds = adminList;
                            item.isContainChildren=true;
                        }
                        if(item.parentId === 0){
                            menuList.push({
                                menuId:item.id,
                                menuName:item.title,
                                menuChilds:item.menuChilds,
                                componentPath:item.path,
                                pathRoute: item.pathRoute,
                                menuImgClass: item.menuImgClass,
                                menuUrl:item.rule,
                                isContainChildren:item.isContainChildren
                            })
                        }
                    }

                })

                console.log('list',menuList)
        return menuList



    }
    const filterMenu1=(menuInfo)=>{

                //setData(data.data)
                let userList = []
                let roleList = []
                let permissionList = []
                let adminList = []
                let menuList = []

                menuInfo.map((item)=>{
                    if(item.isMenu === 1){
                        if(item.parentId === 2){
                            userList.push(item);
                        }
                        if(item.parentId === 3){
                            roleList.push(item);
                        }
                        if(item.parentId === 4){
                            permissionList.push(item);
                        }
                        if(item.parentId === 5){
                            adminList.push(item);
                        }

                        if(item.id === 2){
                            item.child = userList;
                        }
                        if(item.id === 3){
                            item.child = roleList;
                        }
                        if(item.id === 4){
                            item.child = permissionList;
                        }
                        if(item.id === 5){
                            item.child = adminList;
                        }
                        if(item.parentId === 0){
                            menuList.push(item)
                        }
                    }

                })

                console.log('list1',menuList)
        return menuList



    }
    const onSelect = (selectedKeysValue, info) => {
        //console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };
    return (
        <Tree
            checkable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={treeData}
        />
    );
};
export default inject('permission')(observer(App)) ;