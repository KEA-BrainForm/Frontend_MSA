import React, { useState } from 'react';
import ResTextInput from './ResTextInput';
import styles from '../css/SurveyItem.module.css';


function LookupSurveyItem (props) {
  const { question, onDelete, questionType, onSelectedAnswer } = props;
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [selectedshortAnswer, setonShortAnswer] = useState('');


  const obj = {
    id: 4,
    num: 3,
    title: '123',
    yesOrNoAnswer: [
      { id: 4, answer: false }
    ]
  };




  function renderOptions() {
    const options = [];
    for (let i = 1; i <= 5; i++) {
      if (question[`choice${i}`]) {
        const answerObject = question.multipleChoiceAnswers.find(
          (answerObj) => String(answerObj.answer) === String(question[`choice${i}`])
        );
  
        options.push(
          <div key={i}>
            <input
              type="radio"
              name={`question-${question.num}`}
              checked={!answerObject ? String(question[`choice${i}`]) === selectedAnswer:String(answerObject.answer) === String(question[`choice${i}`]) } // 동적으로 체크 여부 결정
              value={question[`choice${i}`]}
         
              required
            />
            {question[`choice${i}`]}
          </div>
        );
      }
    }
    return options;
  }





  function renderYesNo(check) {
    
    return (
      <form>
        <input
          type="radio"
          name={`question-${question.num}`}
          checked={String(check) === 'true'}
          value="true"
      
          required
        />
        참
        <input
          type="radio"
          checked={String(check) === "false"}
          name={`question-${question.num}`}
          value="false"

          required
        />
        거짓
      </form>
    );
  }

  function renderShortAnswer(input) {
    return (
      <div>
         <ResTextInput value={input} />
        
      </div>
    );
  }

  switch (questionType) {
    
    case 'subjectiveQuestions':
      return (
        
        <div className={styles.surveyItem}>
          <h2 className={styles.questionNumber}>Q.{question.num}</h2>
          <p className={styles.questionTitle}>질문: {question.title}</p>
          {renderShortAnswer(question.subjectiveAnswers[0].answer)}
        </div>
      );
    case 'multipleChoiceQuestions':
      return (
        <div className={styles.surveyItem}>
          <h2 className={styles.questionNumber}>Q.{question.num}</h2>
          <p className={styles.questionTitle}>질문: {question.title}</p>
          {renderOptions()}
        </div>
      );
    case 'yesOrNoQuestions':
      console.log("응답",question.yesOrNoAnswer[0].answer);
      return (
        <div className={styles.surveyItem}>
          <h2 className={styles.questionNumber}>Q.{question.num}</h2>
          <p className={styles.questionTitle}>질문: {question.title}</p>
          {renderYesNo(question.yesOrNoAnswer[0].answer)}
        </div>
      );
    default:
      return null;
  }
}

export default LookupSurveyItem;
