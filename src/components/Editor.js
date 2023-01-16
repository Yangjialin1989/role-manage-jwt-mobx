import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
//import { IDomEditor,IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import {Button} from "antd";
import ReactDOM from "react-dom/client";

//
    function MyEditor() {
    // editor 实例
   // const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
    const [editor, setEditor] = useState(null)                   // JS 语法

    // 编辑器内容
    const [html, setHtml] = useState('<p>hello</p>')

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        setTimeout(() => {
            setHtml('<p>请在此编辑内容。</p>')
        }, 1500)
    }, [])

    // 工具栏配置
        // const toolbarConfig: Partial<IToolbarConfig> = { }  // TS 语法
    const toolbarConfig = { }                        // JS 语法

    // 编辑器配置
        // const editorConfig: Partial<IEditorConfig> = {    // TS 语法
       const editorConfig = {                         // JS 语法
        placeholder: '请输入内容...',
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])
    function insertText() {
        console.log(html)
        console.log(editor.getHtml())
            if (editor == null) return
            //editor.insertText('请在此编辑内容。')
        const hello = ReactDOM.createRoot(document.getElementById('hello'));
        hello.render(
            <>
                <div dangerouslySetInnerHTML={{__html:html}}>

                </div>
            </>
        )
        //ReactDOM.render(<p>Hello</p>, document.getElementById('hello'));
        //渲染


    }


    return (
        <>

            <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
            <Button onClick={insertText} type={'primary'}>提交</Button>
            <div style={{ marginTop: '15px' }} >
                {html}
            </div>
            <div id={'hello'}>

            </div>

        </>
    )
}

export default MyEditor