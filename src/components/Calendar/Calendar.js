import { Badge, Calendar } from 'antd';


import './Calendar.css'
const getListData = (value) => {
    //console.log('value',value.date(),value.month())
    let listData1;
            switch (value.date()){
                case 20:
                    listData1 = {
                        type: 'success',
                        content: '华严菩萨圣诞日',
                    }
                    break;
                case 22:
                    listData1 = {
                        type: 'success',
                        content: '弥勒菩萨圣诞日',
                    }
                    break;
            }



    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                {
                    type: 'warning',
                    content: '11111',
                },
                {
                    type: 'success',
                    content: 'This is usual event.',
                },
            ];
            break;
        case 10:
            listData = [
                {
                    type: 'warning',
                    content: 'This is warning event.',
                },
                {
                    type: 'success',
                    content: 'This is usual event.',
                },
                {
                    type: 'error',
                    content: 'This is error event.',
                },
            ];
            break;
        case 15:
            listData = [
                {
                    type: 'warning',
                    content: 'This is warning event',
                },
                {
                    type: 'success',
                    content: 'This is very long usual event。。....',
                },
                {
                    type: 'error',
                    content: 'This is error event 1.',
                },
                {
                    type: 'error',
                    content: 'This is error event 2.',
                },
                {
                    type: 'error',
                    content: 'This is error event 3.',
                },
                {
                    type: 'error',
                    content: 'This is error event 4.',
                },
            ];
            break;
        default:
    }
    return listData1 || [];
};
const getMonthData = (value) => {
    //console.log('month',value)
    if (value.month() === 8) {
        return 1394;
    }
};
const App = () => {
    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };
    const dateCellRender = (value) => {

        const listData = getListData(value);
        if(value.month() === 1){
            return (
                <ul className="events">
                    {listData.map((item) => (
                        <li key={item.content}>
                            <Badge status={item.type} text={item.content} />
                        </li>
                    ))}
                </ul>
            );
        }

    };
    return <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />;
};
export default App;
