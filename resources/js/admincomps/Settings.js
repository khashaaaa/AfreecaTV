import React, { useState, useRef, useEffect } from 'react'

import { Checkbox } from 'primereact/checkbox'
import { Dropdown } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { InputSwitch } from 'primereact/inputswitch'
import { RadioButton } from 'primereact/radiobutton'

import Axios from 'axios'
import moment from 'moment'
import './Settings.scss'

function Settings() {

    const [notifs, setNotifs] = useState([])

    const createdtoast = useRef(null)

    const [scopes, setScopes] = useState('')
    const [stocks, setStocks] = useState('')
    const [stockrates, setStockrates] = useState([])
    const [percent, setPercent] = useState('')
    const [period, setPeriod] = useState('')
    const [descr, setDescr] = useState('')
    const isMountedVal = useRef(1)

    const FetchNotifs = async () => {
        const notifz = await Axios.get('http://210.114.19.151:8080/admin/notifications')
        setNotifs(notifz.data)
    }

    const GetRates = () => {
        Promise.all([
            Axios.get(`http://210.114.19.151:8080/corn`),
            Axios.get(`http://210.114.19.151:8080/euro`),
            Axios.get(`http://210.114.19.151:8080/gas`),
            Axios.get(`http://210.114.19.151:8080/gold`),
            Axios.get(`http://210.114.19.151:8080/nasdaq`),
            Axios.get(`http://210.114.19.151:8080/oil`)
        ]).then(([corn, euro, gas, gold, nasdaq, oil]) => {
            setStockrates([corn.data, euro.data, gas.data, gold.data, nasdaq.data, oil.data])
        })
    }

    useEffect(() => {
        isMountedVal.current = 1
        if(isMountedVal.current) {
            FetchNotifs()
            GetRates()
        }
        return () => { isMountedVal.current = 0 }
    }, [])

    const percentvalues = [
        { label: '5% 이상', value: '5' },
        { label: '10% 이상', value: '10' },
        { label: '20% 이상', value: '20' },
        { label: '30% 이상', value: '30' },
        { label: '40% 이상', value: '40' },
        { label: '50% 이상', value: '50' }
    ]

    const periodvalues = [
        { label: '30분 대비', value: '30' },
        { label: '60분 대비', value: '60' },
        { label: '90분 대비', value: '90' },
        { label: '120분 대비', value: '120' },
        { label: '150분 대비', value: '150' },
        { label: '180분 대비', value: '180' }
    ]

    // Store all selected checkboxes
    let selectedScopes = [...scopes]
    const onScopeChange = (e) => {
        if(e.value == '전체' && e.checked) {
            selectedScopes.push('해외선물', '국내선물', '주식', '암호화폐')
        }
        if(e.value == '전체' && !e.checked) {
            selectedScopes = []
        }
        if(e.checked) {
            selectedScopes.push(e.value)
        }
        else {
            selectedScopes.splice(selectedScopes.indexOf(e.value), 1)
        }
    
        setScopes(selectedScopes);
    }

    // Create new notification
    const CreateNotif = (e) => {
        e.preventDefault()

        if(scopes == '' || stocks == '' || percent == '' || period == '' || descr == '') {
            const showToast = () => {
                createdtoast.current.show({severity:'warn', summary: 'All fields must be filled', detail: 'Check your information and fill all empty fields', life: 3000});
            }

            showToast()
        }
        else {
            GetRates()
            let scopestring = selectedScopes.join()
            let buyrate, sellrate

            switch(stocks) {
                case '옥수수':
                    buyrate = stockrates[0][stockrates[0].length - 1]["buyrate"]
                    sellrate = stockrates[0][stockrates[0].length - 1]["sellrate"]
                    break
                case '유로':
                    buyrate = stockrates[1][stockrates[1].length - 1]["buyrate"]
                    sellrate = stockrates[1][stockrates[1].length - 1]["sellrate"]
                    break
                case '천연가스':
                    buyrate = stockrates[2][stockrates[2].length - 1]["buyrate"]
                    sellrate = stockrates[2][stockrates[2].length - 1]["sellrate"]
                    break
                case '골드':
                    buyrate = stockrates[3][stockrates[3].length - 1]["buyrate"]
                    sellrate = stockrates[3][stockrates[3].length - 1]["sellrate"]
                    break
                case '나스닥':
                    buyrate = stockrates[4][stockrates[4].length - 1]["buyrate"]
                    sellrate = stockrates[4][stockrates[4].length - 1]["sellrate"]
                    break
                case '오일':
                    buyrate = stockrates[5][stockrates[5].length - 1]["buyrate"]
                    sellrate = stockrates[5][stockrates[5].length - 1]["sellrate"]
                    break
                default: null
            }

            Axios.post('http://210.114.19.151:8080/admin/create-notif', {
                state: 'ON',
                scopes: scopestring,
                stocks: stocks,
                changebypercent: percent,
                changebyperiod: period,
                description: descr,
                buyrate: buyrate,
                sellrate: sellrate,
                admin: 'John Doe',
                date: moment().format("YYYY-MM-DD H:mm")
            })
            .then(() => {
                FetchNotifs()
                const showToast = () => {
                    createdtoast.current.show({severity:'info', summary: 'New notification has been added', life: 3000});
                }
    
                showToast()
            })
            .catch(error => {
                console.log(error.response.data.message)
            })
        }
    }

    // Delete notification by ID
    const ToDeletePage = (item) => {

        Axios.delete(`http://210.114.19.151:8080/admin/delete-notif/${item.id}`)
        .then(() => {
            FetchNotifs()
            const showToast = () => {
                createdtoast.current.show({severity:'success', summary: 'Row deleted', life: 3000});
            }

            showToast()
        })
        .catch(error => {
            console.log(error)
        })
    }

    // Update notification state
    const Checked = (item) => {
        let thing = false

        if(item.state == 'ON') {
            thing = true
        }
        const UpdateRow = (item) => {

            let statez = ''
            if(thing === true) {
                statez = 'ON'
            }
            if(thing === false) {
                statez = 'OFF'
            }
        
            Axios.put(`http://210.114.19.151:8080/admin/update-notif/${item.id}`, {
                state: statez
            })
            .then(() => {
                FetchNotifs()
                const showToast = () => {
                    createdtoast.current.show({severity:'success', summary: 'Row updated', life: 3000});
                }
    
                showToast()
            })
            .catch(error => {
                console.log(error)
            })
        }
        return <InputSwitch checked={thing} onChange={() => {UpdateRow(item)}} />
    }

    return (
        <div className="settings">
            <div className="head">
                <h3>채팅방 알림 히스토리</h3>
            </div>
            {/* A message */}
            <Toast ref={createdtoast} position="top-center" />
            {/* A message */}

            {/* Form for create new notification */}
            <form onSubmit={CreateNotif} className="createnotif">
                <div className="scope">
                    <h4>대상</h4>

                    <div className="checkboxes">
                        <Checkbox inputId="1" value="전체" onChange={onScopeChange} checked={scopes.includes('전체')}></Checkbox>
                        <label htmlFor="1">전체</label>
                    </div>
                    <div className="checkboxes">
                        <Checkbox inputId="2" value="해외선물" onChange={onScopeChange} checked={scopes.includes('해외선물')}></Checkbox>
                        <label htmlFor="2">해외선물</label>
                    </div>
                    <div className="checkboxes">
                        <Checkbox inputId="3" value="국내선물" onChange={onScopeChange} checked={scopes.includes('국내선물')}></Checkbox>
                        <label htmlFor="3">국내선물</label>
                    </div>
                    <div className="checkboxes">
                        <Checkbox inputId="4" value="주식" onChange={onScopeChange} checked={scopes.includes('주식')}></Checkbox>
                        <label htmlFor="4">주식</label>
                    </div>
                    <div className="checkboxes">
                        <Checkbox inputId="5" value="암호화폐" onChange={onScopeChange} checked={scopes.includes('암호화폐')}></Checkbox>
                        <label htmlFor="5">암호화폐</label>
                    </div>
                </div>

                <div className="stock">
                    <h4>상품</h4>

                    <div className="checkboxes">
                        <RadioButton inputId="22" name="stock" value="옥수수" onChange={(e) => setStocks(e.value)} checked={stocks === '옥수수'} />
                        <label htmlFor="22">옥수수</label>
                    </div>
                    <div className="checkboxes">
                        <RadioButton inputId="33" name="stock" value="유로" onChange={(e) => setStocks(e.value)} checked={stocks === '유로'} />
                        <label htmlFor="33">유로</label>
                    </div>
                    <div className="checkboxes">
                        <RadioButton inputId="44" name="stock" value="천연가스" onChange={(e) => setStocks(e.value)} checked={stocks === '천연가스'} />
                        <label htmlFor="44">천연가스</label>
                    </div>
                    <div className="checkboxes">
                        <RadioButton inputId="55" name="stock" value="골드" onChange={(e) => setStocks(e.value)} checked={stocks === '골드'} />
                        <label htmlFor="55">골드</label>
                    </div>
                    <div className="checkboxes">
                        <RadioButton inputId="66" name="stock" value="나스닥" onChange={(e) => setStocks(e.value)} checked={stocks === '나스닥'} />
                        <label htmlFor="66">나스닥</label>
                    </div>
                    <div className="checkboxes">
                        <RadioButton inputId="77" name="stock" value="오일" onChange={(e) => setStocks(e.value)} checked={stocks === '오일'} />
                        <label htmlFor="77">오일</label>
                    </div>
                </div>

                <div className="changepercent">
                    <h4>변동</h4>
                    <Dropdown optionLabel="label" value={percent} options={percentvalues} onChange={(e) => setPercent(e.value)} placeholder="퍼센트 선택"/>
                </div>

                <div className="changeperiod">
                    <h4>주기</h4>
                    <Dropdown optionLabel="label" value={period} options={periodvalues} onChange={(e) => setPeriod(e.value)} placeholder="기간 선택"/>
                </div>

                <div className="desc">
                    <h4>설명</h4>
                    <InputTextarea rows={4} cols={50} value={descr} onChange={(e) => setDescr(e.target.value)} autoResize />
                </div>

                <div className="submit">
                    <Button label="등록" />
                </div>
            </form>
            {/* Form for create new notification */}

            {/* List of notifications table */}
            <form className="confignotifs">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>상태</th>
                            <th>설명</th>
                            <th>등록자</th>
                            <th><i className="pi pi-trash"></i></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            notifs.map((ntf, num) => {
                                return (
                                    <tr key={num}>
                                        <td>{ntf.id}</td>
                                        <td className="edit">
                                            {
                                                Checked(ntf)
                                            }
                                        </td>
                                        <td className="descr">
                                            <span>대상: {ntf.scopes} / </span>
                                            <span>상품: {ntf.stocks} / </span>
                                            <span>주기: {ntf.changebyperiod}분대비 / </span>
                                            <span>변동: {ntf.changebypercent}이상만 발송 / </span>
                                            <span>설명: {ntf.description}</span>
                                        </td>
                                        <td>{ntf.admin}</td>
                                        <td><Button onClick={(e) => {e.preventDefault(), ToDeletePage(ntf)}} icon="pi pi-trash" className="p-button-rounded p-button-text p-button-danger" /></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </form>
            {/* List of notifications table */}
        </div>
    )
}

export default Settings;

// DOM element
if (document.getElementById('settings')) {
    ReactDOM.render(<Settings />, document.getElementById('settings'));
}