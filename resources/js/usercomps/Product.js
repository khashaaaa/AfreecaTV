import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, AreaChart, Area, ResponsiveContainer } from 'recharts'

// Single stock chart modal
const Product = ({ setProd, graphdata }) => {

    const [stock, setStock] = useState('')

    useState(() => {
        const PullGraphData = (name) => {

            Axios.get(`http://210.114.19.151:8080/${name}`)
            .then(res => setStock(res.data))
            .catch(error => console.log(error))
        }

        switch(graphdata["name"]) {
            case 'Corn':
                return PullGraphData('corn')
            case 'Euro FX':
                return PullGraphData('euro')
            case 'Natural Gas':
                return PullGraphData('gas')
            case 'Crude Oil (WTI)':
                return PullGraphData('oil')
            case 'Gold':
                return PullGraphData('gold')
            case 'E-mini NASDAQ 100':
                return PullGraphData('nasdaq')
        }
    }, [])

    const Dyntitle = () => {
        switch(graphdata['name']) {
            case 'Corn':
                return '옥수수'
            case 'Euro FX':
                return '유로'
            case 'Natural Gas':
                return '천연가스'
            case 'Crude Oil (WTI)':
                return '오일'
            case 'Gold':
                return '골드'
            case 'E-mini NASDAQ 100':
                return '나스닥'
        }
    }

    const Normalize = () => {
        switch(graphdata['name']) {
            case 'Corn':
                return 'Corn'
            case 'Euro FX':
                return 'Euro'
            case 'Natural Gas':
                return 'Gas'
            case 'Crude Oil (WTI)':
                return 'Oil'
            case 'Gold':
                return 'Gold'
            case 'E-mini NASDAQ 100':
                return 'Nasdaq'
        }
    }

    const toPercent = (decimal, fixed = 0) => `${(decimal * 100)}%`;

    return (
        <div className="dim flex_box on">
            <div className="layer_popup product_popup">
                <h3 className="popup_title">{Dyntitle()} <em className="eng">{Normalize()}</em></h3>
                <div className="contents">
                    <div className="box vs_box">
                        <div className="title">
                            <em>매수 VS 매도 포지션</em>
                            <span><i>매수</i><i>매도</i></span>
                        </div>
                        <div className="graph">
                            <ResponsiveContainer width="100%" height={200}>
                                <AreaChart 
                                    data={stock}
                                    stackOffset="expand"
                                    margin={{ top: 30, right: 30, bottom: 30 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis style={{ fontSize: 10, fontWeight: 'bold' }} dataKey="date" />
                                    <YAxis style={{ fontSize: 10, fontWeight: 'bold' }} tickFormatter={toPercent} domain={[ 'dataMin', 'dataMax' ]} />
                                    <Tooltip contentStyle={{ fontSize: 12, fontWeight: 'bold' }} />
                                    <Area type="monotone" dataKey="buyrate" stackId="1" stroke="red" fill="red" activeDot={{ r: 3 }} />
                                    <Area type="monotone" dataKey="sellrate" stackId="1" stroke="blue" fill="blue" activeDot={{ r: 3 }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="box selling_box">
                        <div className="title">
                            <em>매도 평균가</em>
                        </div>
                        <div className="graph">
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart
                                    data={stock}
                                    margin={{ top: 30, right: 30, bottom: 30 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis style={{ fontSize: 10, fontWeight: 'bold' }} dataKey="date" />
                                    <YAxis style={{ fontSize: 10, fontWeight: 'bold' }} />
                                    <Tooltip contentStyle={{ fontSize: 12, fontWeight: 'bold' }} />
                                    <Line syncId="1" type="monotone" dataKey="avgbuy" stroke="red" activeDot={{ r: 5 }} />
                                    <Line syncId="2" type="monotone" dataKey="avgsell" stroke="blue" activeDot={{ r: 5 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <button type="button" className="close_btn" onClick={() => setProd(false)}>닫기</button>
            </div>
        </div>
    )
}

export default Product