import React, { useState } from "react";
import logo from '../images/Logo.png';
import './css/signup.css'
import queryString from 'query-string';
import Axios from "axios";
import Button from "./ui/Button";


function SignUp() {

  const token = queryString.parse(window.location.search).token;

  const [nickname, setNickName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");

  const handleAgeOptionChange = (event) => {
    setAge(event.target.value);
  };

  const handleJobOptionChange = (event) => {
    setJob(event.target.value);
  };

  const handleGenderOptionChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const registerInfo = { nickname, gender, age, job };
    console.log(registerInfo);

    Axios.post("/api/member/register", registerInfo, {
      headers: {
        'Content-Type': 'application/json', // 요청 본문의 타입을 지정합니다.
        Authorization: `Bearer ${token}` // JWT 토큰을 헤더에 추가합니다.
      }
    })
    .then((response) => {
      if (response.status === 200) {
        alert("회원가입 완료! 한번 더 로그인해주세요!");
        window.location.href = "/login"
      } else {
        console.log(response.data);
        alert(response.data);
      }
    });
  };


  return (
    <div className="background">
      <div className="signup-card">
      <img className="logeSignup" src={logo} alt="logo" height="300"/><br />
          <h1>Sign up</h1><br />
        <div className="content-center">
        
          <form className="signuptext" onSubmit={handleSubmit}>
            <div className="nickname">
              <div >
                <label htmlFor="username">Nickname :</label>
                <input className="signupinput" type="text" id="nickname" onChange={e => setNickName(e.target.value)}  required/>
              </div>
              <div className="genderagegrid">
                <label htmlFor="gender" required>성별 : </label>
                <label>
                  <input type="radio" value="male" checked={gender === 'male'} onChange={handleGenderOptionChange} required />
                  Male
                </label>
                <label>
                  <input type="radio" value="female" checked={gender === 'female'} onChange={handleGenderOptionChange} required />
                  Female
                </label>
              </div>


              <div className="genderagegrid">
                <label htmlFor="age">나이 : </label>
                <label>
                  <input type="radio"
                    value="10대"
                    checked={age === '10대'}
                    onChange={handleAgeOptionChange} required/>
                  10대
                </label>
                <label>
                  <input type="radio"
                    value="20대"
                    checked={age === '20대'}
                    onChange={handleAgeOptionChange} required/>
                  20대
                </label>
                <label>
                  <input type="radio"
                    value="30대"
                    checked={age === '30대'}
                    onChange={handleAgeOptionChange} required/>
                  30대
                </label>
                <label></label>
                <label>
                  <input type="radio"
                    value="40대"
                    checked={age === '40대'}
                    onChange={handleAgeOptionChange} required />
                  40대
                </label>
                <label>
                  <input type="radio"
                    value="50대"
                    checked={age === '50대'}
                    onChange={handleAgeOptionChange} required/>
                  50대
                </label>
                <label>
                  <input type="radio"
                    value="60대이상"
                    checked={age === '60대이상'}
                    onChange={handleAgeOptionChange} required/>
                  60대
                </label>
              </div>
            </div>

            <div className="jobgrid">
              <label htmlFor="job">직업 : </label>

              <label>
                <input type="radio" value="student" checked={job === 'student'} onChange={handleJobOptionChange} required/>
                학생
              </label>
              <label>
                <input type="radio" value="office" checked={job === 'office'} onChange={handleJobOptionChange} required/>
                사무직
              </label>
              <label>
                <input type="radio" value="professional" checked={job === 'professional'} onChange={handleJobOptionChange} required/>
                전문직
              </label>
              <span>
              </span>
              <label>
                <input type="radio" value="civil-servant" checked={job === 'civil-servant'} onChange={handleJobOptionChange} required/>
                공무원
              </label>
              <label>
                <input type="radio" value="research" checked={job === 'research'} onChange={handleJobOptionChange} required/>
                연구직
              </label>
              <label>
                <input type="radio" value="job-unavailable" checked={job === 'job-unavailable'} onChange={handleJobOptionChange} />
                무직
              </label>
            </div>
          <br />
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

          <div className="submitButtonContainer" >
          <Button className="signupbutton" type="submit">회원가입</Button>
          </div>
        </form>
      </div>
    </div >
  </div >
    
  );
}

export default SignUp;