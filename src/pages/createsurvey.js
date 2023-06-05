import './css/pages.css';

import Dropdown from "./ui/Dropdown";
import { Grid, TextField } from "@mui/material";
import DropdownExampleClearable, { questionList } from "./ui/Dropdown";

import Axios from 'axios';
import styled from "styled-components";

import React, { useState, forwardRef } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//import { Form, Radio } from 'semantic-ui-react'
import TextInput from './ui/TextInput';

const Wrapper = styled.div`
    padding: 16px;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    background-color : #A0D3F9;
    overflow:hidden;
    height:auto;
    min-height:100vh;
    margin: auto;
    flex-grow: 1;
`;

const Box = styled.div`
  background-color: #A0D3F9;
    margin: auto;
    justify-content: center;
    width: 100%;
    flex-grow: 1;
    overflow: hidden;
    height:auto;
    padding-bottom:100px;
    min-width: 780px;
    max-width: 780px;  
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;


const Container = styled.div`
  background-color: white;
    width: 100%;
    margin: auto;
    height: auto;
    padding-bottom:10px;
    justify-content: center;
    align-items:center;
    max-width: 780px;
`;

const Card = styled.div`
  background-color: white;
  margin-bottom: 10px;
  padding: 16px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HorizonLine = ({ text }) => {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        borderBottom: "1px solid #aaa",
        lineHeight: "0.1em",
        margin: "10px 0 20px",
      }}
    >
      <span style={{ background: "#fff", padding: "0 10px" }}>{text}</span>
    </div>
  );
};

let globalTitle ;


function TitleInput() { // 제목
  const [title, setTitle] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  
globalTitle = title;

  return (
    <div>
      {/* <h3 htmlFor="title-input">설문 제목</h3>  // 참고
      <input
        type="text"
        id="title-input"
        value={title}
        onChange={handleTitleChange}
      /> */}

      <Grid container style={{ marginTop: 10 }}>
        <h3 htmlFor="title-input">설문 제목</h3>
        <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
          <TextField placeholder="제목을 입력하세요" fullWidth value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              globalTitle = event.target.value;
            }}
            InputProps={{
              style: {
                width: "110%",
                borderRadius: "10px",
              }
            }}
            />
        </Grid>
      </Grid>
    </div>
  );
}

let visibilityTemp = null;
function VisibilitySelector() { //  공개 여부
  const [visibility, setVisibility] = useState("public");

  const handleVisibilityChange = (event) => {
    setVisibility(event.target.value);
  };
  visibilityTemp = visibility;  // **
  return (
    <div>
      <p> [공개 여부]</p>
      <label>
        공개 <span> </span> 
        <input
          type="radio"
          value="public"
          checked={visibility === "public"}
          onChange={handleVisibilityChange}
        />

      </label>
      <label>
        비공개<span> </span> 
        <input
          type="radio"
          value="private"
          checked={visibility === "private"}
          onChange={handleVisibilityChange}
        />
      </label>
      
    </div>
  );
}
let wearableTemp = null;

function WearableSelector() { // 기기 착용 여부
  const [wearable, setWearable] = useState("worn");

  const handleWearableChange = (event) => {
    setWearable(event.target.value);
  };
  wearableTemp = wearable;
  return (
    <div>
      <p> [기기 착용 필수 여부]</p>
      <label>
        착용<span> </span> 
        <input
          type="radio"
          value="worn"
          checked={wearable === "worn"}
          onChange={handleWearableChange}
        />
      </label>
      <label>
        미착용<span> </span> 
        <input
          type="radio"
          value="not-worn"
          checked={wearable === "not-worn"}
          onChange={handleWearableChange}
        />
      </label>
    </div>
  );
}

let startDateTemp = null;
let endDateTemp = null;
function Calendar() {
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  const today = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 7);

  const [startDate1, setStartDate] = useState(today);
  const [endDate1, setEndDate] = useState(threeDaysLater);
  startDateTemp = startDate1;
  endDateTemp = endDate1;
  return (
    <div>
      <p>[설문 기간 설정]</p>
        <label>시작일:</label>
        <DatePicker
          selected={startDate1}
          onChange={handleStartDateChange}
          selectsStart
          dateFormat="yyyy-MM-dd"
          startDate={startDate1}
          endDate={endDate1}
          customInput={<ExampleCustomInput />}
        />
        <label>종료일:</label>
        <DatePicker
          selected={endDate1}
          onChange={handleEndDateChange}
          dateFormat="yyyy-MM-dd"
          selectsEnd
          startDate={startDate1}
          endDate={endDate1}
          minDate={startDate1}
          customInput={<ExampleCustomInput />}
        />
    </div>
  );
}

const Createsurvey = () => {
  const navigate = useNavigate();
  // const history = useHistory();



  const handleSubmit = async (event) => {
    event.preventDefault();
    // 서버로 데이터를 보내는 로직 작성
    // ...
    console.log(globalTitle);
    console.log(questionList);
    console.log(typeof questionList);
    console.log("visibility: ", visibilityTemp);
    console.log("wearable: ", wearableTemp);
    console.log(startDateTemp);
    console.log(endDateTemp);

    const min = 1;
    const max = 1000;
    var randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    
    const token = localStorage.getItem("ACCESS_TOKEN");
    console.log("token", token);
    /**
     * 설문 생성
     * 수정 완료
     */
    let result = await Axios.post("/api/survey", {
      title: globalTitle,
      questionList: questionList,
      visibility: visibilityTemp,
      wearable: wearableTemp,
      startDate: startDateTemp,
      endDate : endDateTemp,
      // surveyId : randomInt
    }, {
      headers: {
        'Content-Type': 'application/json', // 요청 본문의 타입을 지정합니다.
        Authorization: `Bearer ${token}` // JWT 토큰을 헤더에 추가합니다.
      }
    });

    console.log(result);
  
    if (result.status === 200) {
      alert("success to create new question");
      const baseUrl = "http://localhost:3000/check-password/";
      const uniqueUrl = `${baseUrl}${result.data}`;
      navigate("/survey-gen-complete", { state: { uniqueUrl } });
      
    } else {
      alert("failed to create new Car");
    }
    // 다른 페이지로 이동
    // history.push("/home");
    
  };

  return (
    <Wrapper>
    
       
      <Box>
        
        <Card>
           <div>
          <h5 className="fw-bold text-primary text-uppercase">설문 생성</h5>
        </div>
        <Container>
        <TitleInput />
        </Container>
        </Card>
        <Dropdown />
        <Card>
        <Container>
        <h3 htmlFor="title-input">완료 설정</h3>
        <br/>
        <Grid container>
          <Grid item xs={12} md={4}>
            <VisibilitySelector />
            <br/>
            <WearableSelector />
          </Grid>
          <Grid item xs={12} md={4}>
            <Calendar/>
          </Grid>
          <Grid item xs={12} md={4} style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
            <form onSubmit={handleSubmit}>
              <Button type="submit" title="설문 생성 완료"></Button>
            </form>
          </Grid>
        </Grid>
        </Container>
        </Card>
      </Box>
    </Wrapper>
  );
};

export default Createsurvey;