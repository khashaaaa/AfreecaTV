import React from 'react'

const Settings = () => {
    return (
        <div className="dim flex_box on">
            <div className="layer_popup alarm_popup">
                <h3 className="popup_title">Kakao Talk Notification service</h3>
                <div className="contents">
                    <div className="box product_box">
                        <div className="sub_title">
                            <em>Product (Duplicate selection possible)</em>
                        </div>
                        <div className="product">
                            <div className="item">
                                <input id="chk1" type="checkbox" value="nasdaq" />
                                <label htmlFor="chk1">Nasdaq</label>
                            </div>
                            <div className="item">
                                <input id="chk2" type="checkbox" value="oil" />
                                <label htmlFor="chk2">Oil</label>
                            </div>
                            <div className="item">
                                <input id="chk3" type="checkbox" value="gas" />
                                <label htmlFor="chk3">Gas</label>
                            </div>
                            <div className="item">
                                <input id="chk4" type="checkbox" value="eur" />
                                <label htmlFor="chk4">Euro</label>
                            </div>
                            <div className="item">
                                <input id="chk5" type="checkbox" value="gold" />
                                <label htmlFor="chk5">Gold</label>
                            </div>
                            <div className="item">
                                <input id="chk6" type="checkbox" value="con" />
                                <label htmlFor="chk6">Corn</label>
                            </div>
                        </div>
                    </div>
                    <div className="box stock_ratio_box">
                        <div className="sub_title">
                            <em>Ratio</em>
                        </div>
                        <div className="stock_ratio">
                            <div className="item">
                                <label className="rbn" htmlFor="radio1">
                                    <input id="radio1" name="ratio" type="radio" />
                                    <i></i>Buying ratio
                                </label>
                            </div>
                            <div className="item">
                                <label className="rbn" htmlFor="radio2">
                                    <input id="radio2" name="ratio" type="radio" />
                                    <i></i>Selling ratio
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box time_box">
                        <div className="sub_title">
                            <em>Contrast time</em>
                        </div>
                        <div className="time">
                            <div className="item">
                                <label className="rbn" htmlFor="radio3">
                                    <input id="radio3" name="time" type="radio" />
                                    <i></i>30 minutes
                                </label>
                            </div>
                            <div className="item">
                                <label className="rbn" htmlFor="radio4">
                                    <input id="radio4" name="time" type="radio" />
                                    <i></i>30 minutes
                                </label>
                            </div>
                            <div className="item">
                                <label className="rbn" htmlFor="radio5">
                                    <input id="radio5" name="time" type="radio" />
                                    <i></i>30 minutes
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box change_box">
                        <div className="sub_title">
                            <em>Change%</em>
                        </div>
                        <div className="change">
                            <div className="item">
                                <label className="rbn" htmlFor="radio6">
                                    <input id="radio6" name="change" type="radio" />
                                    <i></i>10% change
                                </label>
                            </div>
                            <div className="item">
                                <label className="rbn" htmlFor="radio7">
                                    <input id="radio7" name="change" type="radio" />
                                    <i></i>20% change
                                </label>
                            </div>
                            <div className="item">
                                <label className="rbn" htmlFor="radio8">
                                    <input id="radio8" name="change" type="radio" />
                                    <i></i>30% change
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box option_box">
                        <div className="sub_title">
                            <em>Options</em>
                        </div>
                        <div className="option">
                            <div className="item">
                                <label className="rbn" htmlFor="radio9">
                                    <input id="radio9" name="option" type="radio" />
                                    <i></i>Only one
                                </label>
                            </div>
                            <div className="item">
                                <label className="rbn" htmlFor="radio10">
                                    <input id="radio10" name="option" type="radio" />
                                    <i></i>Keep
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box certify_box">
                        <div className="sub_title">
                            <em>Certification</em>
                        </div>
                        <div className="certify">
                            <input className="phone" placeholder="Please enter a number." type="text" /> <button className="btn certify_btn" disabled type="button">Send authentication number</button> 
                            <input className="certify_input" placeholder="Certification number input" type="text" />
                            <span className="noti on">The remaining time is <em>3 minutes, 00 seconds</em> 입니다.</span>
                        </div>
                    </div>
                </div>
                <div className="signup_area">
                    <button className="btn cancel_btn" disabled type="button">Cancel</button>
                    <button className="btn signup_btn" type="button">Apply</button>
                </div>
                <button className="close_btn" type="button">Close</button>
            </div>
        </div>
    )
}

export default Settings
