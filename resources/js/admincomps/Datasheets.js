import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import { SelectButton } from 'primereact/selectbutton'
import './Datasheets.scss'

import Axios from 'axios'

function Datasheets() {

    const [menu, setSheet] = useState(null)
    const [datasheet, setDatasheet] = useState('')
    const isMountedVal = useRef(1)

    let stocknames = [
        '옥수수',
        '유로',
        '천연가스',
        '골드',
        '나스닥',
        '오일'
    ]

    let stockdatas = []
    for(let data of Object.values(datasheet)) {
        stockdatas.push(data)
    }

    useEffect(() => {
        isMountedVal.current = 1
        if(isMountedVal.current) {
            async function DatasheetsFetch() {
                const sheets = await Axios.get('http://210.114.19.151:8080/admin/datasheet')
                setDatasheet(sheets.data)
            }
            DatasheetsFetch()
        }
        return () => { isMountedVal.current = 0 }
    }, [])

    const InitSheets = () => {

        // Function returns specific stock

        const MapTables = () => {

            switch(menu) {
                case '옥수수':
                    return (
                        <tbody>
                            {
                                stockdatas[0].map((data, num) => {
                                    return (
                                        <tr key={num}>
                                            <td>{data.buyrate}%</td>
                                            <td>{data.sellrate}%</td>
                                            <td>{(Math.round(data.avgbuy * 100) / 100).toFixed(1)}</td>
                                            <td>{(Math.round(data.avgsell * 100) / 100).toFixed(1)}</td>
                                            <td>{data.date}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    )
                case '유로':
                    return (
                        <tbody>
                            {
                                stockdatas[1].map((data, num) => {
                                    return (
                                        <tr key={num}>
                                            <td>{data.buyrate}%</td>
                                            <td>{data.sellrate}%</td>
                                            <td>{(Math.round(data.avgbuy * 100) / 100).toFixed(5)}</td>
                                            <td>{(Math.round(data.avgsell * 100) / 100).toFixed(5)}</td>
                                            <td>{data.date}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    )
                case '천연가스':
                    return (
                        <tbody>
                            {
                                stockdatas[2].map((data, num) => {
                                    return (
                                        <tr key={num}>
                                            <td>{data.buyrate}%</td>
                                            <td>{data.sellrate}%</td>
                                            <td>{(Math.round(data.avgbuy * 100) / 100).toFixed(3)}</td>
                                            <td>{(Math.round(data.avgsell * 100) / 100).toFixed(3)}</td>
                                            <td>{data.date}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    )
                case '오일':
                    return (
                        <tbody>
                            {
                                stockdatas[3].map((data, num) => {
                                    return (
                                        <tr key={num}>
                                            <td>{data.buyrate}%</td>
                                            <td>{data.sellrate}%</td>
                                            <td>{(Math.round(data.avgbuy * 100) / 100).toFixed(2)}</td>
                                            <td>{(Math.round(data.avgsell * 100) / 100).toFixed(2)}</td>
                                            <td>{data.date}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    )
                case '골드':
                    return (
                        <tbody>
                            {
                                stockdatas[4].map((data, num) => {
                                    return (
                                        <tr key={num}>
                                            <td>{data.buyrate}%</td>
                                            <td>{data.sellrate}%</td>
                                            <td>{(Math.round(data.avgbuy * 100) / 100).toFixed(1)}</td>
                                            <td>{(Math.round(data.avgsell * 100) / 100).toFixed(1)}</td>
                                            <td>{data.date}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    )
                case '나스닥':
                    return (
                        <tbody>
                            {
                                stockdatas[5].map((data, num) => {
                                    return (
                                        <tr key={num}>
                                            <td>{data.buyrate}%</td>
                                            <td>{data.sellrate}%</td>
                                            <td>{(Math.round(data.avgbuy * 100) / 100).toFixed(2)}</td>
                                            <td>{(Math.round(data.avgsell * 100) / 100).toFixed(2)}</td>
                                            <td>{data.date}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    )
            }
        }

        return (
            <table className="stockstable">
                <thead>
                    <tr>
                        <th>매수잔고보유비율</th>
                        <th>매도잔고보유비율</th>
                        <th>매수평균가</th>
                        <th>매도평균가</th>
                        <th>일시</th>
                    </tr>
                </thead>
                {MapTables()}
            </table>
        )
    }

    return (
        <div className="datasheets">
            <div className="head">
                <h3>채팅방 알림 히스토리</h3>
            </div>
            <div className="datamenu">
                {/* Menu buttons */}
                <SelectButton value={menu} options={stocknames} onChange={(e) => setSheet(e.value)} />
            </div>

            <div className="sheet">
                {InitSheets()}
            </div>
        </div>
    )
}

export default Datasheets;

// DOM element
if (document.getElementById('datasheets')) {
    ReactDOM.render(<Datasheets />, document.getElementById('datasheets'));
}