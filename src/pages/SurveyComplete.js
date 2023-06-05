import React from "react";
import logo from '../images/Logo2.png';

import './css/surveycomplete.css'
import brainwaves from '../images/brainwaves.png';
import { Link } from 'react-router-dom';

function SurveyComplete() {
  return (
    <div className='background'>
      <div className="home-card">
        <div className="complete-card">
          <div class="container">
            <div class="item2 itemmerge">
              <h2><strong>설문 응답 제출이 완료되었습니다.</strong></h2>
            </div>
            <div class="con2 ">
            뇌파 분석 결과<br/><br/>
              설문 중 전반적으로 <br/>행복/불안/우울 증세가 나타납니다.
            </div>
            <div class="con3 ">
              <img src={brainwaves} alt="brainwave" />
            </div>
          </div>
          <Link to="/"> 
          <button className="completebutton">닫기</button>
          </Link>
        </div>
      </div>
    </div>
  );
}



export default SurveyComplete;
