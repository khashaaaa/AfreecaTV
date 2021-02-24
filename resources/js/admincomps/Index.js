import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import Datasheets from './Datasheets'
import Settings from './Settings'
import History from './History'

import { RadioButton } from 'primereact/radiobutton'
import './Index.scss'

function Index() {

    const [component, setComp] = useState('Datasheets')

    // Change component
    const pageMove = () => {
        switch(component) {
            case 'Datasheets':
                return <Datasheets />
            case 'Settings':
                return <Settings />
            case 'History':
                return <History />
            default: null
        }
    }

    return (
        <div className="index">
            <div className="sidebar">
                <div className="radiofield">
                    <RadioButton inputId="datasheets" name="component" value="Datasheets" onChange={(e) => setComp(e.value)} checked={component === 'Datasheets'} />
                    <label htmlFor="datasheets">데이터 히스토리</label>
                </div>

                <div className="radiofield">
                    <RadioButton inputId="settings" name="component" value="Settings" onChange={(e) => setComp(e.value)} checked={component === 'Settings'} />
                    <label htmlFor="settings">알림 관리</label>
                </div>

                <div className="radiofield">
                    <RadioButton inputId="history" name="component" value="History" onChange={(e) => setComp(e.value)} checked={component === 'History'} />
                    <label htmlFor="history">알림 히스토리</label>
                </div>
            </div>

            <div className="comps">
                {
                    pageMove()
                }
                <div className="blocker"></div>
            </div>
        </div>
    )
}

export default Index;

// DOM element
if (document.getElementById('admin')) {
    ReactDOM.render(<Index />, document.getElementById('admin'));
}