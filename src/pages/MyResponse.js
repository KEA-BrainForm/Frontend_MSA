import React from 'react';
import { Link } from 'react-router-dom';

import Chart from './Chart';
import './css/pages.css';


function MyResponse() {

    return (
        <div className='background'>
            <div className='home-card'>
                <h1>설문조사 제목</h1> <br />
                <form>
                    <div>
                        <h4>Q.1 주관식 질문</h4>
                        <input disabled type='text' value="안녕하세요" />
                    </div> <br />

                    <div>
                        <h4>Q.2 친부식 질문</h4>
                        <label>
                            <input

                                type='checkbox'
                                name='myCheckbox'
                                value='true'
                                checked="checked"
                                required
                            />
                            참
                        </label>
                        <label>
                            <input
                                disabled
                                type='checkbox'
                                name='myCheckbox'
                                value='false'
                                required
                            />
                            거짓
                        </label>
                    </div>
                    <br />

                    <div>
                        <h4>Q.3 객관식 질문</h4>
                        <label>
                            <input
                                disabled
                                type='checkbox'
                                name='myCheckbox'
                                value='1'
                                required
                            />
                            매우 그렇다
                        </label>
                        <label>
                            <input
                                type='checkbox'
                                name='myCheckbox'
                                value='2'
                                checked="checked"
                                required
                            />
                            그렇다
                        </label>
                        <label>
                            <input
                                disabled
                                type='checkbox'
                                name='myCheckbox'
                                value='3'
                                required
                            />
                            보통
                        </label>
                        <label>
                            <input
                                disabled
                                type='checkbox'
                                name='myCheckbox'
                                value='4'
                                required
                            />
                            아니다
                        </label>
                        <label>
                            <input
                                disabled
                                type='checkbox'
                                name='myCheckbox'
                                value='5'
                                required
                            />
                            매우 아니다
                        </label>
                    </div>
                </form>
                <br />

                <div>
                    응답자의 뇌파 분석 결과
                </div>
                <Chart />
                <Link to="/response">
                    <button className="signupbutton" type="submit">수정하기</button>
                </Link>
            </div>
   
        </div>
    );
}

export default MyResponse;
