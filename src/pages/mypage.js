import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../images/Logo.png';
import './css/signup.css';
import Button from "./ui/Button";

const Mypage = () => {
  const [member, setMember] = useState(null);
  const [nickname, setNickName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const token = localStorage.getItem("ACCESS_TOKEN");
        
        //내 정보 조회
        const response = await axios.get(`/api/read/member/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        setMember(response.data);
        setAge(response.data.age);
        setJob(response.data.job);
        setGender(response.data.gender);
        setNickName(response.data.nickname)
      } catch (error) {
        console.error(error);
      }
    }

    fetchMember();
  }, []);

  if (!member) {
    return <div>Loading...</div>; // Or some other loading state
  }



  const handleSubmit = async (event) => {
    event.preventDefault();
    const registerInfo = { nickname, gender, age, job };
    console.log(registerInfo);

    const token = localStorage.getItem("ACCESS_TOKEN");

    //내 정보 수정
    axios.patch("/api/member/changed/", registerInfo, {
      headers: {
        'Content-Type': 'application/json', // 요청 본문의 타입을 지정합니다.
        Authorization: `Bearer ${token}` // JWT 토큰을 헤더에 추가합니다.
      }
    })
      .then((response) => {
        if (response.status === 200) {
          alert("회원정보 수정이 완료되었습니다.");
          //window.location.href = "/login"
        } else {
          console.log(response.data);
          alert(response.data);
        }
      });
  };



  const handleAgeOptionChange = (event) => {
    setAge(event.target.value);
  };

  const handleJobOptionChange = (event) => {
    setJob(event.target.value);
  };

  const handleGenderOptionChange = (event) => {
    setGender(event.target.value);
  };

  return (
    /* 
          
          <p>id:{member.id}</p>
          <p>생성일: {member.createdAt}</p>
          <p>이메일: {member.email}</p>
          <p>사용자 제공자: {member.provider}</p>
          <p>역할: {member.roles.join(', ')}</p>
          <p>업데이트 날짜: {member.updatedAt}</p>
          <p>사용자 이름: {member.username}</p>
    
          <p>=========</p> */

    /* <p
    >별명: {member.nickname}</p>
    <p>성별: {member.gender}</p>
    <p>직업: {member.job}</p>
    <p>나이:{member.age}</p> */
    <div className="background">
      <div className="signup-card">
        <img className="logeSignup" src={logo} alt="logo" style={{ width: "300px" }} /><br />
        <h1>My Page</h1><br />

        <form className="signuptext" onSubmit={handleSubmit}>
          생성일: {member.createdAt}<br />
          업데이트 날짜: {member.updatedAt}<br />
          <br></br>
          <div className="nickname">
            <div >
              <label htmlFor="username">Nickname :</label>
              <input className="signupinput" type="text" id="nickname" defaultValue={member.nickname} onChange={e => setNickName(e.target.value)} required />
            </div>
            이메일: &nbsp; &nbsp;&nbsp; &nbsp;{member.email}<br />

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
                  onChange={handleAgeOptionChange} required />
                10대
              </label>
              <label>
                <input type="radio"
                  value="20대"
                  checked={age === '20대'}
                  onChange={handleAgeOptionChange} required />
                20대
              </label>
              <label>
                <input type="radio"
                  value="30대"
                  checked={age === '30대'}
                  onChange={handleAgeOptionChange} required />
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
                  onChange={handleAgeOptionChange} required />
                50대
              </label>
              <label>
                <input type="radio"
                  value="60대이상"
                  checked={age === '60대이상'}
                  onChange={handleAgeOptionChange} required />
                60대
              </label>
            </div>
          </div>

          <div className="jobgrid">
            <label htmlFor="job">직업 : </label>

            <label>
              <input type="radio" value="student" checked={job === 'student'} onChange={handleJobOptionChange} required />
              학생
            </label>
            <label>
              <input type="radio" value="office" checked={job === 'office'} onChange={handleJobOptionChange} required />
              사무직
            </label>
            <label>
              <input type="radio" value="professional" checked={job === 'professional'} onChange={handleJobOptionChange} required />
              전문직
            </label>
            <span>
            </span>
            <label>
              <input type="radio" value="civil-servant" checked={job === 'civil-servant'} onChange={handleJobOptionChange} required />
              공무원
            </label>
            <label>
              <input type="radio" value="research" checked={job === 'research'} onChange={handleJobOptionChange} required />
              연구직
            </label>
            <label>
              <input type="radio" value="job-unavailable" checked={job === 'job-unavailable'} onChange={handleJobOptionChange} />
              무직
            </label>
            <br /><br /><br /><br />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          </div>
          <div className='submitButtonContainer'>
            <Button className="signupbutton" type="submit">수정하기</Button>
          </div>
        </form>
      </div>
    </div>




  );
}

export default Mypage;