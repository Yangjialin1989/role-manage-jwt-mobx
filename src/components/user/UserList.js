//import React from "@types/react";
import React from 'react';
import './Welcome.css'
import {inject,observer} from "mobx-react";
import EditTable from "../EditTable/EditTable";
import {Button} from "antd";
function UserList (props){

    return (
        <>



                <Button type={'primary'}>添加用户</Button>
                <EditTable></EditTable>


        </>
    )

}
export default inject('user')(observer(UserList))
