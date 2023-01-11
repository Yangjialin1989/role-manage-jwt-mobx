import React from 'react'
import {Dropdown,Button} from "antd";
import { Cascader, Select } from 'antd';
import { useEffect, useState } from 'react';
import cityList from '../assets/pca-code.json'
const { Option } = Select;


//console.log(cityList)
function filterCityList(cityList){
    let arr = []
    cityList.map((item)=>{
        if(item.children){
            arr.push({
                value:item.name,
                label:item.name,
                children:[...filterCityList(item.children)]
            })

        }else{
            arr.push({
                value:item.name,
                label:item.name
            })
        }

    })
    return arr;
}

let options = [...filterCityList(cityList)]
//console.log(options)
const options1 = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        disabled: true,
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];
const onChange = (value) => {
    //console.log(value);
};
const filter = (inputValue, path) =>
    path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);


function City (){
    return(
        <>
            <Cascader options={options}
                      onChange={onChange}
                      showSearch={{
                filter,
            }}
                      style={{width:'250px'}}
            />

        </>
    )
}
export default City