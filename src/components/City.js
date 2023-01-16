import React from 'react'

import { Cascader} from 'antd';

import cityList from '../assets/pca-code.json'
//const { Option } = Select;


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
        return arr

    })
    return arr;
}

let options = [...filterCityList(cityList)]
//console.log(options)

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