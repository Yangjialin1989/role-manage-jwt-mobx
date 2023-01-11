import {Component} from 'react'
import City from '../City'
import {useNavigate} from "react-router-dom";
//inject 注入，observer观察
import {useDispatch, useSelector} from "react-redux";
import {userList} from "../../store/features/userListSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {userLogin} from "../../store/features/userSlice";
import {message,Table,Space,Button} from "antd";
function UserList(props){




        return (
            <>
                <h2>用户列表</h2>


            </>
        )

}
export default UserList