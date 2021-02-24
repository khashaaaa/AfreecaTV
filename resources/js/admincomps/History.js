import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'

import './History.scss'
import Axios from 'axios'
import { CSVLink, CSVDownload } from "react-csv"
import moment from 'moment'

function History() {

    const [notifs, setNotifs] = useState([])
    const [range, setRange] = useState([])
    const [stock, setStock] = useState([])
    const isMountedVal = useRef(1)
    const dt = useRef(null)

    async function GetNotifs() {
        const data = await Axios.get('http://210.114.19.151:8080/admin/history')
        setNotifs(data.data)
    }

    useEffect(() => {
        isMountedVal.current = 1

        // Save all stock to each variable
        if(isMountedVal.current) {
            Promise.all([
                Axios.get(`http://210.114.19.151:8080/corn`),
                Axios.get(`http://210.114.19.151:8080/euro`),
                Axios.get(`http://210.114.19.151:8080/gas`),
                Axios.get(`http://210.114.19.151:8080/gold`),
                Axios.get(`http://210.114.19.151:8080/nasdaq`),
                Axios.get(`http://210.114.19.151:8080/oil`)
            ]).then(([corn, euro, gas, gold, nasdaq, oil]) => {
                setStock([corn.data, euro.data, gas.data, gold.data, nasdaq.data, oil.data])
            })
            GetNotifs()
        }
        
        return () => { isMountedVal.current = 0 }
    }, [])

    const ChooseRange = (data) => {
        setRange(data)
    }

    return (
        <div className="history">
            
            <div className="head">
                <h3>채팅방 알림 히스토리</h3>

                <div className="info">
                    <Calendar 
                        style={{ width: '14rem' }} 
                        id="range" 
                        value={range} onChange={(e) => ChooseRange(e.value)} 
                        dateFormat="yy-mm-dd"
                        selectionMode="range" 
                        readOnlyInput placeholder="시작일과 종료일 선택" />
                    <CSVLink data={notifs}>
                        <Button label="엑셀파일" icon="pi pi-down" iconPos="right" className="p-button-success"></Button>
                    </CSVLink>
                </div>

                {
                    notifs.length == 0 ?
                    <div className="notfound">활성 알림이 없습니다.</div>
                    :
                    <div className="length">
                        <p>알림 건:&nbsp;</p>
                        <p><strong>{notifs.length}</strong>건</p>
                    </div>
                }
            </div>

            {/* History list */}
            <div className="table">
                <table ref={dt}>
                    <thead>
                        <tr>
                            <th>등록정보</th>
                            <th>내용</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            notifs.map((ntf, num) => {

                                let buyrate, sellrate
                                let insertdate = moment(ntf.date).format("YYYY-MM-DD H:mm")
                                let latestdate = moment(insertdate).add(ntf.changebyperiod, 'minutes').format("YYYY-MM-DD H:mm")
                                let currentdate = moment().format("YYYY-MM-DD H:mm")

                                switch(ntf.stocks) {
                                    case '옥수수':
                                        buyrate = stock[0][stock[0].length - 1]["buyrate"]
                                        sellrate = stock[0][stock[0].length - 1]["sellrate"]
                                        break
                                    case '유로':
                                        buyrate = stock[1][stock[1].length - 1]["buyrate"]
                                        sellrate = stock[1][stock[1].length - 1]["sellrate"]
                                        break
                                    case '천연가스':
                                        buyrate = stock[2][stock[2].length - 1]["buyrate"]
                                        sellrate = stock[2][stock[2].length - 1]["sellrate"]
                                        break
                                    case '골드':
                                        buyrate = stock[3][stock[3].length - 1]["buyrate"]
                                        sellrate = stock[3][stock[3].length - 1]["sellrate"]
                                        break
                                    case '나스닥':
                                        buyrate = stock[4][stock[4].length - 1]["buyrate"]
                                        sellrate = stock[4][stock[4].length - 1]["sellrate"]
                                        break
                                    case '오일':
                                        buyrate = stock[5][stock[5].length - 1]["buyrate"]
                                        sellrate = stock[5][stock[5].length - 1]["sellrate"]
                                        break
                                    default: null
                                }

                                const first = moment(range[0]).format("YYYY-MM-DD")
                                const second = moment(range[1]).format("YYYY-MM-DD")

                                let changes = ntf["sellrate"] - sellrate
                                let word

                                if(!range[0]) {

                                    return (
                                        <tr key={num}>
                                            <td className="date">알림설정 ID: {ntf.id}</td>
                                            <td className="infos">
                                                <p>미결제 포지션 비율 변동 발생</p>
                                                <p>발생시간: {ntf.date}</p>
                                                <p>대상: {ntf.scopes}</p>
                                                <p>상품: {ntf.stocks}</p>
                                                <p>알림발생: {ntf.changebypercent}% 변동</p>
                                                <p>주기: {ntf.changebyperiod}분 대비</p>
                                                {
                                                    latestdate <= currentdate && changes !== 0 ?
                                                    <p>결과: <span className="changes">{parseInt(changes)}% {changes < 0 ? '감소': '증가'}</span> (이전: {ntf["buyrate"]}% {ntf["sellrate"]}% 현재: {buyrate}% {sellrate}%)</p>
                                                    :
                                                    <p>결과: 곧 알림이 제공됩니다.</p>
                                                }
                                            </td>
                                        </tr>
                                    )
                                }
                                
                                if(ntf.date >= first && ntf.date <= second) {
                                    return (
                                        <tr key={num}>
                                            <td className="date">알림설정 ID: {ntf.id}</td>
                                            <td className="infos">
                                                <p>미결제 포지션 비율 변동 발생</p>
                                                <p>발생시간: {ntf.date}</p>
                                                <p>대상: {ntf.scopes}</p>
                                                <p>상품: {ntf.stocks}</p>
                                                <p>알림발생: {ntf.changebypercent}% 변동</p>
                                                <p>주기: {ntf.changebyperiod}분 대비</p>
                                                {
                                                    latestdate <= currentdate && changes !== 0 ?
                                                    <p>결과: <span className="changes">{parseInt(changes)}% {changes < 0 ? '감소': '증가'}</span> (이전: {ntf["buyrate"]}% {ntf["sellrate"]}% 현재: {buyrate}% {sellrate}%)</p>
                                                    :
                                                    <p>결과: 곧 알림이 제공됩니다.</p>
                                                }
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
            {/* History list */}
        </div>
    )
}

export default History

// DOM element
if (document.getElementById('history')) {
    ReactDOM.render(<History />, document.getElementById('history'))
}