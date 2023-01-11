//import React from "@types/react";
import React from 'react';
import './Welcome.css'
import {inject,observer} from "mobx-react";
import EditTable from "../EditTable/EditTable";
function UserList (props){

    return (
        <>


                <h2>用户列表</h2>
                <EditTable></EditTable>

        </>
    )

}
export default inject('user')(observer(UserList))
