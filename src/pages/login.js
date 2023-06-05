import React, { useState,useEffect } from 'react';
import './css/home.css'
import logo from '../images/Logo.png';
import kakaoLogin from '../images/kakao_login.png';
import naverLogin from '../images/naver_login.png';
import googleLogin from '../images/google_login.png';

import { Link } from 'react-router-dom';

function ImageButton(props) {
    return (
        <Link to={props.link}>
            <button onClick={props.onClick}>
                <img src={props.src} alt={props.altText} />
            </button>
        </Link>
    );
}

function Login() {

    const [signup, setSignup] = useState(false);

    // useEffect(() => {
    //   const handleWindowLoad = () => {
    //     // Move the Login component to the front by modifying its z-index
    //     const loginCard = document.querySelector('.home-card');
    //     if (loginCard) {
    //       loginCard.style.zIndex = '9999';
    //     }
    //   };
  
    //   window.addEventListener('load', handleWindowLoad);
    //   return () => {
    //     window.removeEventListener('load', handleWindowLoad);
    //   };
    // }, []);
  

    return (
        <div className='logincontainer'>
            <div className="home-card">
                <div>
                    <img src={logo} alt="Logo" width="200" /><br />

                    <div>회원가입을 통해 더 많은 서비스를 즐겨보세요</div> <br />

                    <div>
                        <a href='http://localhost:8081/oauth2/authorization/kakao'>
                            <img width="150px" height="35px" src={kakaoLogin} alt="카카오 로그인" /></a>
                    </div><br/>
                    <div>
                        <a href='http://localhost:8081/oauth2/authorization/naver'>
                            <img width="150px" height="35px" src={naverLogin} alt="네이버 로그인" /></a>
                    </div><br/>
                    <div>
                        <a href='http://localhost:8081/oauth2/authorization/google'>
                            <img width="155px" height="35px" src={googleLogin} alt="구글 로그인" /></a>
                    </div>
                </div>

            </div>

        </div>

    );
}


export default Login;

