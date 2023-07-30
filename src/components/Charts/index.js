import { Line, Pie } from '@ant-design/charts';
import React from 'react'
// const month = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function Charts({ sortedTransaction }) {
    // let datefield;
    const spendingData = sortedTransaction.filter((item) => {
        if (item.type === 'expense') {
            return { tag: item.tag, amount: item.amount }
        }
    })

    // function calculateMonth() {
    //     sortedTransaction.map((item) => {
    //         datefield = (item.date).substring(5, 7)
    //         console.log('Date->', datefield)
    //         if(datefield==='04'){
    //             console.log("April");
    //         }
    //         else{
    //             console.log('Another month')
    //         }
    //     })
    // }
    // calculateMonth()
    const data = sortedTransaction.map((item) => {
        return { date: item.date, amount: item.amount }
    })
    // let finalSpending = spendingData.reduce((acc, obj) => {
    //     let key = obj.tag;
    //     if (!acc[key]) {
    //         acc[key] = { tag: obj.tag, amount: obj.amount }
    //     } else {
    //         acc[key].amount += obj.amount
    //     }
    //     return acc;
    // }, {})
    const config = {
        data: data,
        // width: 900,
        // height:400,
        autoFit: true,
        xField: 'date',
        yField: 'amount',
        // yField:'type'
        point: {
            size: 5,
            shape: 'circle'
        },
        label: {
            style: {
                fill: '#aaa'
            }
        }
    }
    const spendingConfig = {
        data: spendingData,
        // width: 300,
        angleField: 'amount',
        colorField: 'tag',
    }
    let chart;
    let pieChart;
    return (
        <div className='chart-container'>
            <div className='chart-wrapper'>
                <p className='line-graph-msg'><b>Financial Statistics</b></p>
                <Line className='line-graph' {...config} onReady={(chartInstance) => (chart = chartInstance)} />
            </div>
            <div className='chart-wrapper2'>
                <p><b>Total Spending</b></p>
                {spendingData.length == 0 ? <p className='pie-graph-msg'>Seems like you haven't spent anything till now...</p> : <Pie className='pie-graph' {...spendingConfig} onReady={(chartInstance) => (pieChart = chartInstance)} />}
            </div>
        </div>
    )
}

export default Charts
