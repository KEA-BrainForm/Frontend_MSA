import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import Button from "./ui/Button";
import LookupSurveyItem from './ui/LookupSurveyItem';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // Add useLocation
import SurveyComplete from './SurveyComplete';
import Styles from '../pages/css/SurveyItem.module.css';
const token = localStorage.getItem("ACCESS_TOKEN");

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


function ResponseLookup() {

 
  const [surveyData, setSurveyData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const navigate = useNavigate();

  const { surveyId } = useParams();
  const location = useLocation(); // Add this line
  //const password = location.state.password; // Add this line

  const handleAfterSubmit = async (event) => {
    event.preventDefault();
    
    // 서버로 데이터를 보내는 로직 작성

    // 다른 페이지로 이동
    navigate("/response-success");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`${surveyId} !!!`);
        const response = await axios.get(`/api/ques/${surveyId}`);
        setSurveyData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching survey questions:', error);
      }
    };

    fetchData();
  }, [surveyId]);

  function handleSelectedAnswer(questionId, questionNum, answer, questionType) {
    const newAnswerObj = {
      questionId,
      questionNum,
      answer,
      type: questionType,
    };

    setSelectedAnswers((prevAnswers) => {
      const index = prevAnswers.findIndex((a) => a.questionNum === questionNum);
      if (index !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[index] = newAnswerObj;
        return updatedAnswers;
      } else {
        return [...prevAnswers, newAnswerObj];
      }
    });
  }



//   async function handleSubmit() {
//     // Just log the values to be sent in the POST request
//     const selectedAnswersJSON = JSON.stringify(selectedAnswers);
//     const token = localStorage.getItem("ACCESS_TOKEN");
//     try {
//       const response = await axios.post('/api/answer', {
//         surveyId: surveyId,
//         answers: selectedAnswers, // 변경된 부분: 'answer'를 'answers'로 수정하고 selectedAnswers를 그대로 보냅니다.
//       }, {
//         headers: {
//           'Content-Type': 'application/json', // 요청 본문의 타입을 지정합니다.
//           Authorization: `Bearer ${token}` // JWT 토큰을 헤더에 추가합니다.
//         }
//       });

//       if (response.status === 200) {
//         console.log('설문 응답이 성공적으로 제출되었습니다.');
//       } else {
//         console.error('설문 응답 제출에 실패했습니다:', response.status);
//       }
//     } catch (error) {
//       console.error('설문 응답 제출 중 오류가 발생했습니다:', error);
//     }
//   }

//   const handleStop = async () => {
//     try {
//       const response = await axios.post(`/api/${surveyId}/${password}/stop`, {}, {
//         headers: {
//           Authorization: `Bearer ${token}` // JWT 토큰을 헤더에 추가합니다.
//         }
//       });
  
//       if (response.status === 200) {
//         window.alert("설문 종료"); // Show an alert when the survey is stopped
//         // Perform any other actions needed after stopping the survey
//       }
//     } catch (error) {
//       console.error('Error stopping the survey:', error);
//     }
//   };
  

  if (!surveyData) {
    return <div>Loading...</div>;
  }
  const sortedQuestions = [...surveyData.yesOrNoQuestions, ...surveyData.multipleChoiceQuestions, ...surveyData.subjectiveQuestions].sort((a, b) => a.num - b.num);


  console.log("sortedQuestions: ", sortedQuestions);


  return (
    <Wrapper >
      <Box> 
      <Card>
      <div>
          <h5 className="fw-bold text-primary text-uppercase">설문 조회</h5>
        </div>
      <Container>
      <h1>제목 : {surveyData.title}</h1>
      </Container>
        </Card>
      {sortedQuestions.map((question) => {
        let questionType;
        if (surveyData.yesOrNoQuestions.includes(question)) {
          questionType = "yesOrNoQuestions";
        } else if (surveyData.multipleChoiceQuestions.includes(question)) {
          questionType = "multipleChoiceQuestions";
        } else if (surveyData.subjectiveQuestions.includes(question)) {
          questionType = "subjectiveQuestions";
        }
        return (
          <LookupSurveyItem
            key={question.id}
            question={question}
            questionType={questionType}
            onSelectedAnswer={(questionNum, answer) =>
              handleSelectedAnswer(
                question.id,
                question.num,
                answer,
                questionType
              )
            }
          />
        );
      })}<br></br>
    <form onSubmit={handleAfterSubmit}>
    
   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    

      </form>
      </Box>
    </Wrapper>
  );
}

export default ResponseLookup;