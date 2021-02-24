import React, { useState, useEffect, Fragment } from 'react'
import ReactDOM from 'react-dom'
import Settings from './Settings'
import Product from './Product'

import { PieChart } from 'react-minimal-pie-chart'
import Axios from 'axios'
import moment from 'moment'

const Landing = () => {

    const [stocks, setStocks] = useState('')
    const [prodModal, setProd] = useState(false)
    const [settings, setSettings] = useState(false)
    const [tooltip, setTooltip] = useState(false)
    const [graphdata, setGraph] = useState('')

    useEffect(() => {

        const PullStockData = async() => {

            const stocks = await Axios.get(`http://210.114.19.151:8080`)
            setStocks(stocks.data)
        }

        PullStockData()
    }, [])

    const ShowGraph = (stock) => {
        setGraph(stock)
    }

    const itemz = []

    // Single stock donut
    const Stock = ({ stock }) => {

        // Dynamic title
        const Dyntitle = () => {
            switch(stock[0]['name']) {
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
            switch(stock[0]['name']) {
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

        return (
            <li onClick={() => {setProd(true), ShowGraph(stock[0])}}>

                {/* Chart titles */}
                <div className="graph_title_box">
                    <span style={{ padding: '0', marginRight: '10px' }} className="thum">
                        <img style={{ height: '100%', width: '100%' }} alt={`${stock[0]['name']}`} src={`/images/${stock[0]['name']}.png`} />
                    </span>
                    <strong className="title">
                        {Dyntitle()} <em className="eng">{Normalize()}</em>
                    </strong>
                </div>
                {/* Chart titles */}

                {/* Chart body */}
                <div style={{ overflow: 'hidden', cursor: 'pointer' }} className="graph_box">
                        <PieChart
                            className="graph"
                            data = {
                                [
                                    { title: 'Sell', value: parseInt(stock[0]['sellrate']), color: 'blue' },
                                    { title: 'Buy', value: parseInt(stock[0]['buyrate']), color: 'red' }
                                ]
                            }
                            labelPosition = '40'
                            lineWidth = '40'
                            label={({ dataEntry }) => `${dataEntry.percentage.toFixed()}%`}
                            labelStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                            background = 'white'
                            radius = '46'
                        />
                    <div className="price">
                        <p>
                            <span>매도 평균가</span>
                            <strong className="selling">{Number(stock[0]['avgsell']).toLocaleString()}</strong>
                        </p>
                        <p>
                            <span>매수 평균가</span>
                            <strong className="buying">{Number(stock[0]['avgbuy']).toLocaleString()}</strong>
                        </p>
                    </div>
                </div>
                {/* Chart body */}
            </li>
        )
    }

    for(let [key, item] of Object.entries(stocks)) {
        itemz.push(<Stock key={key} stock={item} />)
    }

    // Tooltip popup
    const ShowTooltip = () => {

        if(tooltip === true) {
            return (
                <div className="tooltip">
                    <p>
                        <span>해당 자료는 이베스트투자증권의 실거래 미결제 잔고를 기반한 자료 입니다.</span>
                        <span>매 시간 30분 단위로 갱신 되며, 몇 분의 오차가 있을 수도 있습니다.</span>
                        <span>매도비율, 매수비율 : 각 상품별 매도, 매수 보유잔고의 비율입니다.</span>
                        <span>매도평균가, 매수평균가 : 각 상품별 매도, 매수 보유 전체 잔고의 평균 가격입니다.</span>
                        <span>상품별 보유 월물이 다른 경우도 합산되어 계산됩니다.</span>
                    </p>
                </div>
            )
        }
    }

    return (
        <Fragment>
            {
                settings === true ?
                <Settings />
                :
                null
            }
            {
                prodModal === true ?
                <Product graphdata={graphdata} setProd={setProd} />
                :
                null
            }

            {/* Container */}
            <div className="main_wrap" style={{ position: 'relative' }}>
                {/* Head */}
                <div className="header">
                    <div className="inner">
                        <div className="logo">
                            <a href="" target="_blank" className="apro_logo" title="Apro">Apro</a>
                            <a href="" target="_blank" className="ebest_logo" title="eBEST">eBEST</a>
                        </div>
                        <h1 className="dp_logo">
                            <a href="" title="DPOSITION">DPOSITION</a>
                        </h1>

                        <div className="login_box">
                            <a href="" className="board_btn">게시판</a>
                            <a href="" className="alarm_btn">알람</a>
                            <a href="" className="login_btn">로그인</a>
                        </div>
                    </div>
                </div>
                {/* Head */}

                {/* Charts */}
                <div className="container" id="container">
                    {/* Images use absolute paths */}
                    <div className="banner_area"><img alt="배너 이미지" src="/images/banner.jpg" /></div>
                    <div className="content_area">
                        <div className="inner">
                            <div className="banner_aside">
                                <a href="https://pa.adimg.afreecatv.com/RealMedia/ads/Creatives/Afreecatv/210215_Ebest_Apro_180x443/210215_Ebest_180x443.png" target="_blank"><img src="/images/banner.png" /></a>
                            </div>
                            <div className="title_box">
                                <h2 className="title">미결제 포지션 현황</h2>
                                <em style={{ marginLeft: '1rem' }} className="date">
                                    {moment().format("MM/DD HH:MM")} 갱신 
                                    <i className="tooltip_ico" 
                                        onMouseEnter={(e) => {e.preventDefault(), setTooltip(true)}}
                                        onMouseLeave={(e) => {e.preventDefault(), setTooltip(false)}}
                                    >툴팁</i>
                                </em> 
                                <span>*이베스트투자증권 제공 실거래 미결제 포지션 현황</span>
                                {
                                    ShowTooltip()
                                }
                            </div>
                            <ul>
                                {itemz}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Charts */}

                {/* Footer */}
                <div className="footer">
                    <ul className="footer_list">
                        <li>
                            <a href="">회사소개</a>
                        </li>
                        <li>
                            <a href="">인재채용</a>
                        </li>
                        <li>
                            <a href="">이용약관</a>
                        </li>
                        <li>
                            <a href="">광고문의</a>
                        </li>
                        <li>
                            <a href=""><strong>개인정보취급방침</strong></a>
                        </li>
                        <li>
                            <a href="">청소년보호정책</a>
                        </li>
                        <li>
                            <a href="">권리침해신고센터</a>
                        </li>
                        <li>
                            <a href="">사이트맵</a>
                        </li>
                    </ul>
                    <div className="adr">
                        ㈜아프리카TV<span>대표자 : 서수길</span><span>사업자번호 : 220-81-10886</span><span>통신판매번호 제2010-경기성남-0834</span><span><a href="http://ftc.go.kr/bizCommPop.do?wrkr_no=2208110886&apv_perm_no=" target="_blank">사업자 정보 확인</a></span><br />
                        <address>
                            주소 : 경기도 성남시 분당구 판교로228번길 15 판교세븐밴처밸리 1단지 2동 ㈜아프리카TV(삼평동)
                        </address><span>FAX : 031-622-8008</span><span><a className="mail" href="mailto:afreecaTV@afreecatv.com" title="메일">afreecaTV@afreecatv.com</a> (1688-7022)</span>
                    </div>
                    <ul className="util">
                        <li className="util1">
                            <a href="">아프리카TV 홈</a>
                        </li>
                        <li className="util2">
                            <a href="">대표전화 1666-9821</a>
                        </li>
                        <li className="util3">
                            <a href="">이메일상담</a>
                        </li>
                    </ul><strong className="copy">&copy; AfreecaTV Corp.</strong>
                </div>
                {/* Footer */}
            </div>
            {/* Container */}
        </Fragment>
    )
}

export default Landing

if (document.getElementById('landing')) {
    ReactDOM.render(<Landing />, document.getElementById('landing'));
}