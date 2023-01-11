import React from 'react'
import {Dropdown,Button} from "antd";

function Headers (){
    return(
        <>
            <Dropdown
                menu={
                {
                    key: '1',
                    label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                    </a>
                    ),
                }
                }
                placement="bottom"
                arrow
            >
                <Button>bottomLeft</Button>
            </Dropdown>
        </>
    )
}
export default Headers