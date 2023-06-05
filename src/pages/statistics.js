import './css/stat.css';

import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import StatisticSurveyItem from './ui/StatisticSurveyItem';
import axios from 'axios';

const token = localStorage.getItem("ACCESS_TOKEN");

const SurveyStatistic = () => {
  const { surveyId } = useParams();
  const [surveyData, setSurveyData] = useState(null);
  const [sortedQuestions, setSortedQuestions] = useState([]);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        /**
         * 설문 통계 가져오기
         * 수정 완료
         */
        const response = await axios.get(`/api/survey/result/${surveyId}`);
        console.log("response: ", response.data);
        setSurveyData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSurvey();
  }, [surveyId]);

  useEffect(() => {
    if (surveyData) {
      console.log("필터링 된 surveydata1", surveyData);
      const questions = [...surveyData.yesOrNoQuestions, ...surveyData.multipleChoiceQuestions, ...surveyData.subjectiveQuestions];
      console.log("필터링 된 questions", questions);
      const sortedQuestions = questions.sort((a, b) => a.num - b.num);
      setSortedQuestions(sortedQuestions);
      console.log("** 1st. surveyData: ", sortedQuestions);
    }
  }, [surveyData]);

  if (!surveyData) {
    return <div>Loading...</div>; // 데이터가 로딩 중일 때 보여줄 내용
  }

  // 필터 적용 버튼을 클릭했을 때 호출되는 함수
  const applyFilters = async () => {
    // 선택된 체크박스 값을 가져옵니다.
    const genderCheckboxes = document.querySelectorAll('input[name="gender"]:checked');
    const ageCheckboxes = document.querySelectorAll('input[name="age"]:checked');
    const occupationCheckboxes = document.querySelectorAll('input[name="occupation"]:checked');

    const activeCheckboxes = document.querySelectorAll('input[name="brainwave"]:checked');

    // 선택된 체크박스 값을 배열로 변환합니다.
    const selectedGenders = Array.from(genderCheckboxes).map((checkbox) => checkbox.value);
    const selectedAges = Array.from(ageCheckboxes).map((checkbox) => checkbox.value);
    const selectedOccupations = Array.from(occupationCheckboxes).map((checkbox) => checkbox.value);
    const selectActive = Array.from(activeCheckboxes).map((checkbox) => checkbox.value);

    const queryString = new URLSearchParams({
      id: surveyId,
      gender: selectedGenders,
      age: selectedAges,
      job: selectedOccupations,
      isActive: selectActive
    }).toString();

    console.log(queryString);

    try {
      /**
       * 통계 결과 필터 적용
       * 수정 완료
       */
      const response = await axios.get('/api/survey/filter?' + queryString, {}, {
        headers: {
          'Content-Type': 'application/json', // 요청 본문의 타입을 지정합니다.
          Authorization: `Bearer ${token}` // JWT 토큰을 헤더에 추가합니다.
        }
      });
      setSurveyData(response.data);
      console.log("필터 적용 성공", surveyData);
    } catch (error) {
      console.error("필터 적용 실패", error);
    }
  };

  return (
    <div className='background-statistic'>
      <div className='left-side'>
        <h1 style={{marginBottom: "30px" }}><b>제목 : {surveyData.title}</b></h1>

        {sortedQuestions.map((question) => {
          let questionType;

          if (surveyData.yesOrNoQuestions.includes(question)) {
            questionType = "yesOrNoQuestions";
          } else if (surveyData.multipleChoiceQuestions.includes(question)) {
            questionType = "multipleChoiceQuestions";
          } else if (surveyData.subjectiveQuestions.includes(question)) {
            questionType = "subjectiveQuestions";
          } else {
            questionType = null;
          }
          return (
            <StatisticSurveyItem
              key={question.id}
              question={question}
              questionType={questionType}
              sortedQuestions={sortedQuestions}
            />
          );
        })}<br />
      </div>
      <div className='right-side'>
        <div className='right-card'>
          <h2 style={{ marginBottom: '40px', marginLeft: '-10px' }}><b>필터</b></h2>
          <div className='filters'>
            <h3 style={{ marginLeft: '-10px' }}>성별</h3>
            <label>
              <input type='checkbox' name='gender' value='male' /> 남성
            </label>
            <label>
              <input type='checkbox' name='gender' value='female' /> 여성
            </label>
            <h3 style={{ marginTop: '40px', marginLeft: '-10px' }}>연령대</h3>
            <label>
              <input type='checkbox' name='age' value='10대' /> 10대
            </label>
            <label>
              <input type='checkbox' name='age' value='20대' /> 20대
            </label>
            <label>
              <input type='checkbox' name='age' value='30대' /> 30대
            </label>
            <label>
              <input type='checkbox' name='age' value='40대' /> 40대
            </label>
            <label>
              <input type='checkbox' name='age' value='50대' /> 50대 이상
            </label>
            <h3 style={{ marginTop: '40px', marginLeft: '-10px' }}>직업</h3>
            <label>
              <input type='checkbox' name='occupation' value='student' /> 학생
            </label>
            <label>
              <input type='checkbox' name='occupation' value='office' /> 사무직
            </label>
            <label>
              <input type='checkbox' name='occupation' value='professional' /> 전문직
            </label>
            <label>
              <input type='checkbox' name='occupation' value='civil-servant' /> 공무원
            </label>
            <label>
              <input type='checkbox' name='occupation' value='research' /> 연구직
            </label>
            <label>
              <input type='checkbox' name='occupation' value='job-unavailable' /> 무직
            </label>
            <h3 style={{ marginTop: '40px', marginLeft: '-10px' }}>뇌파 결과 적용</h3>
            <label>
              <input type='checkbox' name='brainwave' value='active' /> 활성화
            </label>
            <br/><br/>
            <button className="apply-filter-button" onClick={applyFilters}>필터 적용</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SurveyStatistic;
