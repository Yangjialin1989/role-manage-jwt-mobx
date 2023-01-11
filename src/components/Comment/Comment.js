import {Component} from 'react'
import './index.css'
import avatar from '../../assets/avatar.png'
// 依赖的数据


//有一个状态type 1,2,3
//返回标签不同
//复杂的，集合成函数
function formatTime(time){
    //时间格式化
    return `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`
}




class Comment extends Component{
    state = {
    // hot: 热度排序  time: 时间排序
    tabs: [
        {
            id: 1,
            name: '热度',
            type: 'hot'
        },
        {
            id: 2,
            name: '时间',
            type: 'time'
        }
    ],
    active: 'hot',
    list: [
        {
            id: 1,
            author: '刘德华',
            comment: '给我一杯忘情水',
            time: new Date('2021-10-10 09:09:00'),
            // 1: 点赞 0：无态度 -1:踩
            attitude: 1
        },
        {
            id: 2,
            author: '周杰伦',
            comment: '哎哟，不错哦',
            time: new Date('2021-10-11 09:09:00'),
            // 1: 点赞 0：无态度 -1:踩
            attitude: 0
        },
        {
            id: 3,
            author: '五月天',
            comment: '不打扰，是我的温柔',
            time: new Date('2021-10-11 10:09:00'),
            // 1: 点赞 0：无态度 -1:踩
            attitude: -1
        }
    ],
    comment:'发一条友善的评论',
    count:null
}

    //函数 this. 调用
    trigger = (item)=>{
        console.log(item)
    }



//组件加载完成后调用
    componentDidMount() {

    }
    switchTab = (type)=>{
        console.log(type)
        this.setState({
            active:type
        })
    }
    textareaChange = (e)=>{

        this.setState({
            comment:e.target.value
        })

    }
    submitComment = (props)=>{
        console.log(this.props)
        this.setState({
            list:[
                ...this.state.list,{
                id: crypto.randomUUID(),
                author: '刘三姐',
                comment: this.state.comment,
                time: new Date(),
                // 1: 点赞 0：无态度 -1:踩
                attitude: 2
            }],
            count:this.state.list.length
    })

    }
    delComment = (id)=>{
        console.log(id)
        this.setState({
            list:this.state.list.filter(item=>item.id !==id)
        })
    }
    toggleLike = (curItem)=>{
        //如果1，改 0，如果1，改-1
        const {attitude,id} = curItem
        this.setState({
            list:this.state.list.map(item=>{
                //
                // if(item.id === id){
                //     return {
                //         ...item,//当属性重复，会覆盖后面的，
                //         attitude: attitude === 1 ? 0 : 1
                //     }
                // }else{
                //     return item
                // }
                return item.id === id ? {...item,attitude: attitude === 1 ? 0 : 1 } : item;

            })
        })

    }
    toggleHate = (curItem)=>{
        //如果1，改 0，如果1，改-1
        const {attitude,id} = curItem
        this.setState({
            list:this.state.list.map(item=>{
                //
                // if(item.id === id){
                //     return {
                //         ...item,//当属性重复，会覆盖后面的，
                //         attitude: attitude === 1 ? 0 : 1
                //     }
                // }else{
                //     return item
                // }
                return item.id === id ? {...item,attitude: attitude === -1 ? 0 : -1 } : item;

            })
        })

    }

    render() {


        //条件渲染，
        return (
            <div className="App">
                <div className="comment-container">
                    {/* 评论数 */}
                    <div className="comment-head">
                        {this.props.child}
                        <span onClick={this.props.getMsg}>{this.state.count}评论{this.props.name}</span>
                    </div>
                    {/* 排序 */}
                    <div className="tabs-order">
                        <ul className="sort-container" >
                            {this.state.tabs.map(item=>
                                <li onClick={()=>this.switchTab(item.type)} id={item.id} className={item.type === this.state.active ? 'on':''}>按{item.name}排序</li>)}
                        </ul>
                    </div>

                    {/* 添加评论 */}
                    <div className="comment-send">
                        <div className="user-face">
                            <img className="user-head" src={avatar} alt="" />
                        </div>
                        <div className="textarea-container">
            <textarea
                cols="80"
                rows="5"
                placeholder="发条友善的评论"
                className="ipt-txt"
                value={this.state.comment}
                onChange={this.textareaChange}
            />
                            <button onClick={this.submitComment} className="comment-submit">发表评论</button>
                        </div>
                        <div className="comment-emoji">
                            <i className="face"></i>
                            <span className="text">表情</span>
                        </div>
                    </div>

                    {/* 评论列表 */}
                    <div className="comment-list">

                        {this.state.list.map(item=>(
                            <div className="list-item" key={item.id}>
                                <div className="user-face">
                                    <img className="user-head" src={avatar} alt="" />
                                </div>
                                <div className="comment">
                                    <div className="user">{item.author}</div>
                                    <p className="text">{item.comment}</p>
                                    <div className="info">
                                        <span className="time">{formatTime(item.time)}</span>
                                        {/*动态类名控制*/}
                                        <span onClick={()=>this.toggleLike(item)} className={item.attitude === 1 ? 'like liked' : 'like'}>
                                            <i className="icon" />
                                        </span>
                                        <span onClick={()=>this.toggleHate(item)} className={item.attitude === -1 ? 'hate hated' : 'hate'}>
                                            <i className="icon" />
                                        </span>
                                        <span onClick={()=>this.delComment(item.id)} className="reply btn-hover">删除</span>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </div>
        )
    }
}
export default Comment