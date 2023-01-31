import React, { useState,useEffect } from 'react';
import { PlusOutlined} from '@ant-design/icons';
import { Modal, Upload} from 'antd';
import ImgCrop from 'antd-img-crop';
import {inject,observer} from 'mobx-react'
//import cookie from 'react-cookies'
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);

    });

function  App (props){
    useEffect(()=>{
        // dom操作
        setImgid(props.adminInfo._id)

    },[])


    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [imgid,setImgid]=useState();
    const [fileList, setFileList] = useState([])
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);



        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));


    };
    const handleChange =({ fileList: newFileList }) => {
       // console.log(props.admin)

       // console.log(imgid)
       // console.log(fileList)

        setFileList(newFileList)
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                修改头像
            </div>
        </div>
    );

    function handleDrop() {
        //console.log('jinlaile')
    }


    return (
        <>
            <ImgCrop rotate>
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
           action="/api/admins/avatar"
           // action={props.admin.avatar(imgid).then(data=>console.log(data))}
           // action={handleAction}
            headers={
                {"Authorization":"Bearer "+localStorage.getItem('token'),"id":imgid}


            }
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            onDrop={handleDrop}
        >
            {fileList.length >= 1 ? null : uploadButton}
        </Upload>
            </ImgCrop>
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img
                alt="example"
                style={{
                    width: '50%',
                }}
                src={previewImage}
            />
        </Modal>

        </>);
};
export default inject('admin')(observer(App))
//export default App